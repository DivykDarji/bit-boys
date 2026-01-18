from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import base64
import re
from datetime import datetime

from facenet_pytorch import MTCNN, InceptionResnetV1
import onnxruntime as ort

DEMO_MODE = True

app = Flask(__name__)
CORS(app)

BASE_DIR = "storage/users"
os.makedirs(BASE_DIR, exist_ok=True)

mtcnn = MTCNN(keep_all=False)
facenet = InceptionResnetV1(pretrained="vggface2").eval()

ANTI_SPOOF_PATH = "models/anti_spoof_model.onnx"

spoof_session = ort.InferenceSession(
    ANTI_SPOOF_PATH,
    providers=["CPUExecutionProvider"]
)

print("Spoof input shape:", spoof_session.get_inputs()[0].shape)


# ---------------- UTIL ----------------

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def preprocess_spoof(img):
    img = cv2.resize(img, (80, 80))
    img = img.astype(np.float32)
    img = np.transpose(img, (2, 0, 1))
    img = np.expand_dims(img, axis=0)
    return img


def is_real_face(img):
    try:
        input_name = spoof_session.get_inputs()[0].name
        tensor = preprocess_spoof(img)

        output = spoof_session.run(None, {input_name: tensor})[0]
        scores = output[0]

        exp = np.exp(scores - np.max(scores))
        probs = exp / np.sum(exp)

        real_prob = float(probs[1])

        print("Spoof REAL:", real_prob)

        return real_prob > (0.01 if DEMO_MODE else 0.6)

    except Exception as e:
        print("Spoof error:", e)
        return True if DEMO_MODE else False


# ---------------- ENROLL ----------------

@app.route("/enroll-face", methods=["POST"])
def enroll_face():

    user_id = request.form.get("userId")
    username = request.form.get("username")
    files = request.files.getlist("images")

    if not user_id or not username:
        return jsonify({"success": False}), 400

    if len(files) != 3:
        return jsonify({"success": False}), 400

    safe = re.sub(r"[^a-zA-Z0-9]", "_", username.lower())
    today = datetime.now().strftime("%Y_%m_%d")

    folder = os.path.join(BASE_DIR, f"{safe}_{today}")
    os.makedirs(folder, exist_ok=True)

    embeddings = []
    paths = []

    for idx, file in enumerate(files):

        filename = f"face_{idx+1}.jpg"
        path = os.path.join(folder, filename)
        file.save(path)

        img = cv2.imread(path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        face, prob = mtcnn(img_rgb, return_prob=True)

        if face is None or prob < 0.9:
            return jsonify({"success": False}), 400

        emb = facenet(face.unsqueeze(0))
        embeddings.append(emb.detach().numpy().flatten())

        paths.append(path.replace(BASE_DIR, ""))

    avg_embedding = np.mean(embeddings, axis=0)

    return jsonify({
        "success": True,
        "embedding": avg_embedding.tolist(),
        "imagePaths": paths
    })


# ---------------- VERIFY ----------------

@app.route("/verify-face", methods=["POST"])
def verify_face():

    data = request.get_json()
    stored = np.array(data["embedding"])
    frames = data["frames"]

    spoof_votes = []
    match_votes = []

    for frame in frames:

        img_bytes = base64.b64decode(frame)
        img_np = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        face, prob = mtcnn(img_rgb, return_prob=True)

        if face is None or prob < 0.8:
            continue

        crop = face.permute(1, 2, 0).numpy()
        crop = cv2.cvtColor(crop, cv2.COLOR_RGB2BGR)

        real = is_real_face(crop)
        spoof_votes.append(real)

        emb = facenet(face.unsqueeze(0))
        emb = emb.detach().numpy().flatten()

        score = cosine_similarity(stored, emb)

        match_votes.append(score > 0.65)

        print("Match score:", score)

    if len(match_votes) == 0:
        return jsonify({"success": False}), 400

    if not DEMO_MODE and spoof_votes.count(True) < 2:
        return jsonify({"success": False}), 403

    if match_votes.count(True) < 1:
        return jsonify({"success": False}), 401

    return jsonify({"success": True})


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
