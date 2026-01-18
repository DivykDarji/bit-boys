import React, { useEffect, useState } from "react";

const App = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  // ================= HANDLE REDIRECT TOKEN =================

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
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // ================= LOGIN MODES =================

  // Authorization mode (scope forced)
  const loginWithScope = (scope) => {
    window.location.href = `http://localhost:5173/auth-hub?scope=${scope}&redirectUri=http://localhost:3000`;
  };

  // Identity login mode (no scope)
  const loginGeneric = () => {
    window.location.href = "http://localhost:5173/auth-hub";
  };

  // ================= UI =================

  return (
    <div style={{ padding: 40 }}>
      {!profile && (
        <>
          <h2>External Portal</h2>

          {/* GENERIC LOGIN (NO SCOPE) */}

          <button onClick={loginGeneric}>Sign in with Pehchaan</button>

          <br />
          <br />

          <hr />

          <p>Or authorize specific service:</p>

          {/* SCOPED LOGIN */}

          <button onClick={() => loginWithScope("health")}>
            Sign in with Health Portal
          </button>

          <br />
          <br />

          <button onClick={() => loginWithScope("farm")}>
            Sign in with Farmer Portal
          </button>

          <br />
          <br />

          <button onClick={() => loginWithScope("city")}>
            Sign in with Smart City Portal
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      {profile && (
        <>
          <h2>Login Success</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default App;
