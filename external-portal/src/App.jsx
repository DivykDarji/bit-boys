import React, { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    fetch("http://localhost:5000/api/identity/authorize/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Authorization failed");
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  const loginWithScope = (scope) => {
    window.location.href = `http://localhost:5173/auth-hub?scope=${scope}&clientId=bitboys&redirectUri=http://localhost:3000`;
  };

  const loginGeneric = () => {
    window.location.href = "http://localhost:5173/auth-hub";
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="topbar">
        <span className="portal-title">EXTERNAL PORTAL | BIT BOYS</span>
      </header>

      {/* MAIN */}
      <main className="container">
        {!profile && (
          <>
            <h1>Identity Authorization</h1>

            <p className="subtitle">
              Secure, consent-based access using Pehchaan Digital Identity
            </p>

            <div className="card">
              <button className="primary" onClick={loginGeneric}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                Sign in with Pehchaan
              </button>

              <div className="divider" />

              <button onClick={() => loginWithScope("health")}>
                <svg viewBox="0 0 24 24">
                  <path d="M20.8 4.6c-1.6-1.5-4.1-1.5-5.7 0L12 7.5l-3.1-2.9c-1.6-1.5-4.1-1.5-5.7 0-1.8 1.7-1.8 4.5 0 6.2l8.8 8.3 8.8-8.3c1.8-1.7 1.8-4.5 0-6.2z" />
                </svg>
                Health Authorization
              </button>

              <button onClick={() => loginWithScope("farm")}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 12l8-8 8 8M5 10v10h14V10" />
                </svg>
                Agriculture Authorization
              </button>

              <button onClick={() => loginWithScope("city")}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 21V3h18v18" />
                </svg>
                Smart City Authorization
              </button>

              {error && <p className="error">{error}</p>}
            </div>
          </>
        )}

        {profile && (
          <>
            <h1 style={{ color: "green" }}>✅ Access Granted</h1>

            <p style={{ marginBottom: 10 }}>
              Identity verified via Pehchaan biometric gateway
            </p>

            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
