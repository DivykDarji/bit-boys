import React, { useRef, useEffect, useState } from "react";

const ProviderVerify = ({ title, subtitle, styles, scope }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const eyeHistory = useRef([]);
  const streamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [livenessPassed, setLivenessPassed] = useState(false);
  const [instruction, setInstruction] = useState("Please blink your eyes");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const params = new URLSearchParams(window.location.search);
  const authToken = params.get("authToken");

  /* ================= CAMERA INIT ================= */

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (!mounted || !videoRef.current) return;

        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      } catch (err) {
        console.error(err);
        setError("Camera permission denied");
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  /* ================= LIVENESS ================= */

  useEffect(() => {
    let camera;

    const startLiveness = async () => {
      if (!videoRef.current) return;

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
        if (!landmarks || landmarks.length < 468) return;

        const leftEye = Math.abs(landmarks[159].y - landmarks[145].y);
        const rightEye = Math.abs(landmarks[386].y - landmarks[374].y);

        const avgEye = (leftEye + rightEye) / 2;

        eyeHistory.current.push(avgEye);
        if (eyeHistory.current.length > 5) eyeHistory.current.shift();

        const smoothBlink =
          eyeHistory.current.reduce((a, b) => a + b, 0) /
          eyeHistory.current.length;

        // Blink detected
        if (smoothBlink < 0.012) {
          setLivenessPassed(true);
          setInstruction("Blink verified ✓");
          return;
        }

        // Head motion fallback
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

  /* ================= FRAME CAPTURE ================= */

  const captureFrames = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 480;
    canvas.height = 360;

    const frames = [];

    for (let i = 0; i < 3; i++) {
      ctx.drawImage(videoRef.current, 0, 0, 480, 360);

      frames.push(
        canvas
          .toDataURL("image/jpeg", 0.7)
          .replace("data:image/jpeg;base64,", "")
      );

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

      // -------------------------------
      // EXTERNAL AUTH FLOW
      // -------------------------------

      if (authToken) {
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

        if (!res.ok || !data.redirect) {
          throw new Error("Authorization failed");
        }

        // Redirect to external portal
        window.location.href = data.redirect;
        return;
      }

      // -------------------------------
      // INTERNAL APP VERIFICATION
      // -------------------------------

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
            scope,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Internal verification failed");
      }

      // Back to dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>

        <p style={styles.subtitle}>{subtitle}</p>

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

        <p>{instruction}</p>

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

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ProviderVerify;
