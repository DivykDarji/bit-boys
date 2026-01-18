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

# ================= CONFIG =================

DEMO_MODE = True   # Set to False for production

# ================= APP INIT =================

app = Flask(__name__)
CORS(app)

BASE_DIR = "storage/users"
os.makedirs(BASE_DIR, exist_ok=True)

# ================= MODELS =================

mtcnn = MTCNN(keep_all=False)
facenet = InceptionResnetV1(pretrained="vggface2").eval()

ANTI_SPOOF_PATH = "models/anti_spoof_model.onnx"

spoof_session = ort.InferenceSession(
    ANTI_SPOOF_PATH,
    providers=["CPUExecutionProvider"]
)

print("Spoof input shape:",
      spoof_session.get_inputs()[0].shape)

# ================= UTILS =================

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


# ---------- SPOOF PREPROCESS ----------

def preprocess_spoof(img):

    # Expected input size for this model
    img = cv2.resize(img, (80, 80))

    # Keep BGR order
    img = img.astype(np.float32)

    # HWC -> CHW
    img = np.transpose(img, (2, 0, 1))

    # Batch dimension
    img = np.expand_dims(img, axis=0)

    return img


# ---------- SPOOF INFERENCE ----------

def is_real_face(img):

    input_name = spoof_session.get_inputs()[0].name
    input_tensor = preprocess_spoof(img)

    output = spoof_session.run(None, {input_name: input_tensor})[0]

    scores = output[0]  # logits

    # Stable softmax
    exp_scores = np.exp(scores - np.max(scores))
    probs = exp_scores / np.sum(exp_scores)

    fake_prob = float(probs[0])
    real_prob = float(probs[1])

    print("Spoof probs -> REAL:", real_prob, "FAKE:", fake_prob)

    if DEMO_MODE:
        # Very permissive for demo webcam environment
        return real_prob > 0.01
    else:
        # Stricter for production
        return real_prob > 0.60


# ================= ENROLL FACE =================

@app.route("/enroll-face", methods=["POST"])
def enroll_face():

    user_id = request.form.get("userId")
    username = request.form.get("username")
    files = request.files.getlist("images")

    if not user_id or not username:
        return jsonify({"success": False, "message": "User info missing"}), 400

    if not files or len(files) != 3:
        return jsonify({"success": False, "message": "Exactly 3 images required"}), 400

    safe_name = re.sub(r"[^a-zA-Z0-9]", "_", username.lower())
    today = datetime.now().strftime("%Y_%m_%d")

    folder_name = f"{safe_name}_{today}"
    user_folder = os.path.join(BASE_DIR, folder_name)

    # Prevent duplicate enroll
    if os.path.exists(user_folder):
        return jsonify({"success": False, "message": "Face already enrolled"}), 400

    os.makedirs(user_folder, exist_ok=True)

    embeddings = []
    image_paths = []

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    for idx, file in enumerate(files, start=1):

        filename = f"face_{timestamp}_{idx}.jpg"
        img_path = os.path.join(user_folder, filename)

        file.save(img_path)

        img = cv2.imread(img_path)
        if img is None:
            return jsonify({"success": False, "message": "Invalid image"}), 400

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces, prob = mtcnn(img_rgb, return_prob=True)

        if faces is None or prob is None or prob < 0.90:
            return jsonify({
                "success": False,
                "message": "Low quality or invalid face detected"
            }), 400

        embedding = facenet(faces.unsqueeze(0))
        embedding = embedding.detach().numpy().flatten()

        embeddings.append(embedding)

        relative_path = img_path.replace(BASE_DIR, "").replace("\\", "/")
        image_paths.append(relative_path)

    final_embedding = np.mean(embeddings, axis=0)

    return jsonify({
        "success": True,
        "embedding": final_embedding.tolist(),
        "imagePaths": image_paths
    })


# ================= VERIFY FACE =================

@app.route("/verify-face", methods=["POST"])
def verify_face():

    # Safely get JSON so missing keys don't crash
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "message": "Invalid JSON"}), 400

    stored_embedding = data.get("embedding")
    frames = data.get("frames")

    if stored_embedding is None or frames is None:
        return jsonify({"success": False, "message": "Missing embedding or frames"}), 400

    stored_embedding = np.array(stored_embedding)

    spoof_votes = []
    match_votes = []

    for idx, frame64 in enumerate(frames):

        try:
            img_bytes = base64.b64decode(frame64)
            np_img = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

            if img is None:
                continue

            # -------- Face Detection --------
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            faces, prob = mtcnn(img_rgb, return_prob=True)

            if faces is None or prob is None or prob < 0.80:
                # skip this frame if detection is poor
                continue

            # Crop face for spoof and match
            face_crop = faces.permute(1, 2, 0).numpy()
            face_crop = cv2.cvtColor(face_crop, cv2.COLOR_RGB2BGR)

            # -------- Spoof Check --------
            real = is_real_face(face_crop)
            spoof_votes.append(real)

            # In demo, do not block matching even if spoof is low
            if not real and not DEMO_MODE:
                continue

            # -------- Face Match --------
            new_embedding = facenet(faces.unsqueeze(0))
            new_embedding = new_embedding.detach().numpy().flatten()

            # Slightly relaxed threshold for webcam/demo
            score = cosine_similarity(stored_embedding, new_embedding)
            match_votes.append(score > 0.65)

            print(f"Frame {idx+1} -> Spoof:{real}  MatchScore:{score:.3f}")

        except Exception as e:
            # log and continue
            print("Frame error:", e)
            continue

    print("Spoof votes:", spoof_votes)
    print("Match votes:", match_votes)

    # -------- Safety: no valid frames --------
    if len(match_votes) == 0:
        return jsonify({
            "success": False,
            "message": "No valid face frames captured"
        }), 400

    # -------- Final decision --------
    if DEMO_MODE:
        spoof_passed = True
    else:
        spoof_passed = spoof_votes.count(True) >= 2

    if not spoof_passed:
        return jsonify({
            "success": False,
            "spoof": True,
            "message": "Spoof attack detected"
        }), 403

    if match_votes.count(True) < 1:
        return jsonify({
            "success": False,
            "match": False,
            "message": "Face mismatch"
        }), 401

    return jsonify({
        "success": True,
        "message": "Identity verified successfully"
    })


# ================= HEALTH =================

@app.route("/health")
def health():
    return jsonify({"status": "ok"})


# ================= RUN =================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
