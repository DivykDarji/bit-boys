import React, { useRef, useState, useEffect } from "react";
import { authorizeStyles } from "./style";

const Authorize = () => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [authToken, setAuthToken] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);

  const scope = params.get("scope");
  const redirectUri = params.get("redirectUri");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // ================= BASIC VALIDATION =================

  useEffect(() => {

    if (!scope || !redirectUri) {
      setError("Invalid authorization request");
      return;
    }

    if (!token) {
      setError("Please login to Pehchaan first");
      return;
    }

  }, [scope, redirectUri, token]);

  // ================= ATTACH CAMERA STREAM SAFELY =================

  useEffect(() => {

    if (cameraOn && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play();
    }

  }, [cameraOn, cameraStream]);

  // ================= CLEANUP CAMERA ON UNMOUNT =================

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // ================= START CONSENT =================

  const startConsent = async () => {
  try {

    const res = await fetch(
      `http://localhost:5000/api/identity/authorize?scope=${scope}&redirectUri=${redirectUri}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Authorization blocked");
      return;
    }

    setAuthToken(data.authToken);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    });

    setCameraStream(stream);
    setCameraOn(true);

  } catch (err) {
    console.error(err);
    setError("Authorization failed");
  }
};

  // ================= VERIFY FACE =================

  const verifyIdentity = async () => {

    if (!authToken) return;

    setLoading(true);
    setError("");

    try {

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0);

      const imageBase64 = canvas
        .toDataURL("image/jpeg")
        .replace("data:image/jpeg;base64,", "");

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
        }
      );

      const data = await res.json();

      if (!res.ok || !data.redirect) {
        throw new Error("Verification failed");
      }

      // Safe redirect
      window.location.replace(data.redirect);

    } catch (err) {
      console.error(err);
      setError("Face verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <div style={authorizeStyles.container}>
      <div style={authorizeStyles.card}>

        <h2 style={authorizeStyles.title}>
          Authorize {scope?.toUpperCase()} Access
        </h2>

        <p style={authorizeStyles.text}>
          This application wants permission to access your verified identity
          information from Pehchaan.
        </p>

        {!cameraOn && !error && (
          <button onClick={startConsent} style={authorizeStyles.button}>
            Approve & Continue
          </button>
        )}

        {cameraOn && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={authorizeStyles.video}
            />

            <canvas ref={canvasRef} hidden />

            <button
              onClick={verifyIdentity}
              disabled={loading}
              style={authorizeStyles.button}
            >
              {loading ? "Verifying..." : "Verify Face & Sign In"}
            </button>
          </>
        )}

        {error && <p style={authorizeStyles.error}>{error}</p>}

      </div>
    </div>
  );
};

export default Authorize;
