import React, { useRef, useEffect, useState } from "react";
import { styles } from "./health_style";

const ProviderHealth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const eyeHistory = useRef([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [livenessPassed, setLivenessPassed] = useState(false);
  const [instruction, setInstruction] = useState("Please blink your eyes");

  const authToken = localStorage.getItem("pendingAuth");
  const isExternalFlow = !!authToken;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  /* ================= CAMERA INIT ================= */

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(() => {
        setError("Camera permission denied");
      });

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  /* ================= LIVENESS (BLINK + MOTION) ================= */

  useEffect(() => {
    let camera;

    const startLiveness = async () => {
      const { FaceMesh } = await import("@mediapipe/face_mesh");
      const { Camera } = await import("@mediapipe/camera_utils");

      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => {
        if (!results.multiFaceLandmarks || livenessPassed) return;

        const landmarks = results.multiFaceLandmarks[0];

        // LEFT eye
        const leftTop = landmarks[159].y;
        const leftBottom = landmarks[145].y;

        // RIGHT eye
        const rightTop = landmarks[386].y;
        const rightBottom = landmarks[374].y;

        const leftEye = Math.abs(leftTop - leftBottom);
        const rightEye = Math.abs(rightTop - rightBottom);

        const avgEye = (leftEye + rightEye) / 2;

        // Temporal smoothing
        eyeHistory.current.push(avgEye);
        if (eyeHistory.current.length > 5) {
          eyeHistory.current.shift();
        }

        const avgBlink =
          eyeHistory.current.reduce((a, b) => a + b, 0) /
          eyeHistory.current.length;

        // Blink detection
        if (avgBlink < 0.012) {
          setLivenessPassed(true);
          setInstruction("Blink verified ✓");
          return;
        }

        // Fallback: head movement (for glasses glare)
        const noseX = landmarks[1].x;

        if (Math.abs(noseX - 0.5) > 0.08) {
          setLivenessPassed(true);
          setInstruction("Motion verified ✓");
        }
      });

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    };

    startLiveness();

    return () => {
      if (camera) camera.stop();
    };
  }, [livenessPassed]);

  /* ================= MULTI FRAME CAPTURE ================= */

  const captureFrames = async () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // 🔥 Reduce resolution (huge size saver)
  const TARGET_WIDTH = 480;
  const TARGET_HEIGHT = 360;

  canvas.width = TARGET_WIDTH;
  canvas.height = TARGET_HEIGHT;

  const frames = [];

  for (let i = 0; i < 3; i++) {
    // Draw resized frame
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      TARGET_WIDTH,
      TARGET_HEIGHT
    );

    // 🔥 Compress JPEG (quality vs size balance)
    const base64 = canvas
      .toDataURL("image/jpeg", 0.7)
      .replace("data:image/jpeg;base64,", "");

    frames.push(base64);

    // Small delay between frames (temporal capture)
    await new Promise((r) => setTimeout(r, 300));
  }

  return frames;
};


  /* ================= VERIFY ================= */

  const verifyFace = async () => {
    try {
      setLoading(true);
      setError("");

      const frames = await captureFrames();

      /* ===== External provider flow ===== */

      if (isExternalFlow) {
        const res = await fetch(
          "http://localhost:5000/api/identity/authorize/approve",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authToken,
              frames,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.redirect) throw new Error();

        localStorage.removeItem("pendingAuth");
        window.location.replace(data.redirect);
        return;
      }

      /* ===== Internal flow ===== */

      const res = await fetch(
        "http://localhost:5000/api/identity/internal/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frames,
            scope: "health",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error();

      window.location.href = "/dashboard";
    } catch {
      setError("Verification failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>CityCare Hospital Verification</h2>

        <p style={styles.subtitle}>
          Secure biometric verification with live liveness detection
        </p>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            borderRadius: 12,
            border: "2px solid #e5e7eb",
          }}
        />

        <canvas ref={canvasRef} hidden />

        <p style={{ marginTop: 12 }}>
          Liveness Status:{" "}
          <span style={{ color: livenessPassed ? "green" : "orange" }}>
            {livenessPassed ? "Verified" : "Waiting"}
          </span>
        </p>

        <p style={{ fontSize: 14 }}>{instruction}</p>

        <button
          onClick={verifyFace}
          disabled={!livenessPassed || loading}
          style={{
            ...styles.startBtn,
            opacity: !livenessPassed || loading ? 0.6 : 1,
          }}
        >
          {loading ? "Running Secure Verification..." : "Verify Identity"}
        </button>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </div>
    </div>
  );
};

export default ProviderHealth;
