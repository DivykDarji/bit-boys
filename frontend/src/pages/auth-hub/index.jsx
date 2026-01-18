import React from "react";
import { hubStyles } from "./style";

/* ================= ICONS ================= */

const HealthIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M8.96173 19.3786L12 21.75L15.0383 19.3787C18.7914 16.1268 22.75 11.4354 22.75 9.31747C22.75 3.5 16 2 12 6C8 2 1.25 3.5 1.25 9.3175C1.25 11.4354 5.20863 16.1267 8.96173 19.3786Z"
      fill="#d9534f"
    />
    <path
      d="M16.5 7V11M14.5 9H18.5"
      stroke="#d9534f"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const FarmIcon = () => (
  <svg viewBox="0 0 14 14" width="22" height="22" fill="#8a9a5b">
    <path d="M1 6h12v7H1zM3 3h8v3H3z" />
  </svg>
);

const CityIcon = () => (
  <svg viewBox="0 0 16 16" width="22" height="22" fill="#d2b48c">
    <path d="M11 1H1V15H15V9H11V1ZM3 3H5V5H3V3ZM7 3H9V5H7V3ZM7 7H9V9H7V7ZM11 11H13V13H11V11Z" />
  </svg>
);

/* ================= COMPONENT ================= */

const AuthHub = () => {
  const params = new URLSearchParams(window.location.search);
  const incomingScope = params.get("scope");

  const redirectUri = encodeURIComponent("http://localhost:3000/callback");

  const launchExternalApp = (selectedScope) => {
    // If portal already sent scope → lock it
    // If not → use user selected service
    const finalScope = incomingScope || selectedScope;

    if (!finalScope) {
      alert("Please select a service to continue");
      return;
    }

    window.location.href = `http://localhost:5173/authorize?scope=${finalScope}&redirectUri=${redirectUri}`;
  };

  return (
    <div style={hubStyles.page}>
      <div style={hubStyles.card}>
        <div style={hubStyles.logoContainer}>
          <h1 style={hubStyles.logo}>Pehchaan</h1>
          <p style={hubStyles.logoSubtitle}>Identity Gateway</p>
        </div>

        <p style={hubStyles.headline}>
          {incomingScope
            ? `Continue to ${incomingScope.toUpperCase()} Portal`
            : "Choose a service to continue"}
        </p>

        <div style={hubStyles.buttonContainer}>
          {/* HEALTH */}

          {(!incomingScope || incomingScope === "health") && (
            <button
              style={hubStyles.button}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, hubStyles.buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, {
                  backgroundColor: "#faf9f7",
                  borderColor: "#e8ddc8",
                  color: "#3d3d3d",
                  transform: "none",
                  boxShadow: "none",
                })
              }
              onClick={() => launchExternalApp("health")}
            >
              <span style={hubStyles.buttonIcon}>
                <HealthIcon />
              </span>
              Health Portal
            </button>
          )}

          {/* FARM */}

          {(!incomingScope || incomingScope === "farm") && (
            <button
              style={hubStyles.button}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, hubStyles.buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, {
                  backgroundColor: "#faf9f7",
                  borderColor: "#e8ddc8",
                  color: "#3d3d3d",
                  transform: "none",
                  boxShadow: "none",
                })
              }
              onClick={() => launchExternalApp("farm")}
            >
              <span style={hubStyles.buttonIcon}>
                <FarmIcon />
              </span>
              Farmer Portal
            </button>
          )}

          {/* CITY */}

          {(!incomingScope || incomingScope === "city") && (
            <button
              style={hubStyles.button}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, hubStyles.buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, {
                  backgroundColor: "#faf9f7",
                  borderColor: "#e8ddc8",
                  color: "#3d3d3d",
                  transform: "none",
                  boxShadow: "none",
                })
              }
              onClick={() => launchExternalApp("city")}
            >
              <span style={hubStyles.buttonIcon}>
                <CityIcon />
              </span>
              City Portal
            </button>
          )}
        </div>

        <div style={hubStyles.footer}>
          <p style={hubStyles.footerText}>
            Secure identity verification powered by Pehchaan
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthHub;
