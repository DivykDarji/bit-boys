import React, { useRef, useEffect, useState } from "react";
import { styles } from "./health_style";

const ProviderHealth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authToken = localStorage.getItem("pendingAuth");
  const isExternalFlow = !!authToken;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  /* ================= CAMERA INIT ================= */

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((media) => {
        setStream(media);
        videoRef.current.srcObject = media;
        videoRef.current.play();
      })
      .catch(() => {
        setError("Camera permission denied");
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  /* ================= VERIFY FACE ================= */

  const verifyFace = async () => {
    try {
      setLoading(true);
      setError("");

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0);

      const imageBase64 = canvas
        .toDataURL("image/jpeg")
        .replace("data:image/jpeg;base64,", "");

      /* ========== EXTERNAL FLOW ========== */

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
              imageBase64,
            }),
          },
        );

        const data = await res.json();

        if (!res.ok || !data.redirect) throw new Error();

        localStorage.removeItem("pendingAuth");

        window.location.replace(data.redirect);
        return;
      }

      /* ========== INTERNAL FLOW ========== */

      const res = await fetch(
        "http://localhost:5000/api/identity/internal/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageBase64,
            scope: "health",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error();

      window.location.href = "/dashboard";
    } catch {
      setError("Face verification failed");
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
          Verify your face to complete authorization
        </p>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", borderRadius: 10 }}
        />

        <canvas ref={canvasRef} hidden />

        <button
          onClick={verifyFace}
          disabled={loading}
          style={styles.startBtn}
        >
          {loading ? "Verifying..." : "Verify Face"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ProviderHealth;
