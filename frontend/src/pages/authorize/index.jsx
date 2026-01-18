import React, { useEffect, useState } from "react";
import { authorizeStyles } from "./style";

const Authorize = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);

  const scope = params.get("scope");
  const redirectUri = params.get("redirectUri");
  const clientId = params.get("clientId");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // ================= BASIC VALIDATION =================

  useEffect(() => {

    if (!scope || !redirectUri || !clientId) {
      setError("Invalid authorization request");
      return;
    }

    if (!token) {
      setError("Please login to Pehchaan first");
      return;
    }

  }, [scope, redirectUri, clientId, token]);

  // ================= START AUTH REQUEST =================

  const startConsent = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/identity/authorize?scope=${scope}&redirectUri=${redirectUri}&clientId=${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authorization blocked");
      }

      // Save auth session token
      localStorage.setItem("pendingAuth", data.authToken);

      // 👉 Redirect user to dashboard to approve consent
      window.location.href =
        `http://localhost:5173/dashboard?scope=${scope}&clientId=${clientId}`;

    } catch (err) {
      console.error(err);
      setError(err.message || "Authorization failed");
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
          {clientId} is requesting access to your identity data.
          You will review and approve this request on your dashboard.
        </p>

        {!error && (
          <button
            onClick={startConsent}
            disabled={loading}
            style={authorizeStyles.button}
          >
            {loading ? "Creating Request..." : "Continue"}
          </button>
        )}

        {error && <p style={authorizeStyles.error}>{error}</p>}

      </div>
    </div>
  );
};

export default Authorize;
