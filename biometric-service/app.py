from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import base64
from facenet_pytorch import MTCNN, InceptionResnetV1
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

BASE_DIR = "storage/users"
os.makedirs(BASE_DIR, exist_ok=True)

mtcnn = MTCNN(keep_all=False)
facenet = InceptionResnetV1(pretrained="vggface2").eval()


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


# ================= ENROLL =================

@app.route("/enroll-face", methods=["POST"])
def enroll_face():

    user_id = request.form.get("userId")
    username = request.form.get("username")
    files = request.files.getlist("images")

    if not user_id or not username:
        return jsonify({"success": False, "message": "User info missing"}), 400

    if not files or len(files) != 3:
        return jsonify({"success": False, "message": "Exactly 3 images required"}), 400

    # ---------------- SAFE FOLDER NAME ----------------

    safe_name = re.sub(r'[^a-zA-Z0-9]', '_', username.lower())

    today = datetime.now().strftime("%Y_%m_%d")

    folder_name = f"{safe_name}_{today}"

    user_folder = os.path.join(BASE_DIR, folder_name)

    # Prevent duplicate enrollment
    if os.path.exists(user_folder):
        return jsonify({
            "success": False,
            "message": "Face already enrolled"
        }), 400

    os.makedirs(user_folder, exist_ok=True)

    embeddings = []
    image_paths = []

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # ---------------- PROCESS FILES ----------------

    for idx, file in enumerate(files, start=1):

        filename = f"face_{timestamp}_{idx}.jpg"

        img_path = os.path.join(user_folder, filename)

        file.save(img_path)

        img = cv2.imread(img_path)

        if img is None:
            return jsonify({"success": False, "message": "Invalid image file"}), 400

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        faces, prob = mtcnn(img_rgb, return_prob=True)

        # Quality check
        if faces is None or prob is None or prob < 0.90:
            return jsonify({
                "success": False,
                "message": "Low quality or invalid face detected"
            }), 400

        embedding = facenet(faces.unsqueeze(0))
        embedding = embedding.detach().numpy().flatten()

        embeddings.append(embedding)

        # Save RELATIVE PATH for MongoDB
        relative_path = img_path.replace(BASE_DIR, "").replace("\\", "/")

        image_paths.append(relative_path)

    final_embedding = np.mean(embeddings, axis=0)

    return jsonify({
        "success": True,
        "embedding": final_embedding.tolist(),
        "imagePaths": image_paths
    })


# ================= VERIFY =================

@app.route("/verify-face", methods=["POST"])
def verify_face():

    data = request.json

    stored_embedding = np.array(data["embedding"])
    image_base64 = data["image"]

    img_bytes = base64.b64decode(image_base64)
    np_img = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    faces, prob = mtcnn(img_rgb, return_prob=True)

    if faces is None or prob is None or prob < 0.85:
        return jsonify({"match": False, "score": 0})

    new_embedding = facenet(faces.unsqueeze(0))
    new_embedding = new_embedding.detach().numpy().flatten()

    score = cosine_similarity(stored_embedding, new_embedding)

    return jsonify({
        "match": bool(score >= 0.75),
        "score": float(score)
    })


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

