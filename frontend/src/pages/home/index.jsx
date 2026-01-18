import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, layout, headerStyles, dashboardStyles } from "./style";

/* ================= ICONS ================= */

const HealthIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3
      c1.74 0 3.41.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

const AgricultureIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 2C8 6 6 10 6 13a6 6 0 0 0 12 0c0-3-2-7-6-11z" />
    <path d="M12 13v9" />
  </svg>
);

const CityIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <rect x="3" y="3" width="7" height="18" />
    <rect x="14" y="7" width="7" height="14" />
    <path d="M6 7h.01M6 11h.01M6 15h.01" />
    <path d="M17 11h.01M17 15h.01" />
  </svg>
);

/* ================= CARD ================= */

const SectorCard = ({
  title,
  description,
  status,
  actionLabel,
  onAction,
  bgColor,
  textColor,
  icon,
}) => (
  <div style={dashboardStyles.sectorCard}>
    <div
      style={{
        ...dashboardStyles.cardTop,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div style={dashboardStyles.iconWrapper}>{icon}</div>
    </div>

    <div style={dashboardStyles.cardBottom}>
      <h3 style={dashboardStyles.cardTitle}>{title}</h3>

      <p style={dashboardStyles.cardText}>{description}</p>

      <p
        style={{
          marginTop: 10,
          fontWeight: 700,
          color:
            status === "Verified"
              ? "green"
              : status === "Linked"
                ? "#c47f00"
                : "#999",
        }}
      >
        Status: {status}
      </p>

      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

/* ================= PAGE ================= */

const Home = () => {
  const navigate = useNavigate();

  const [wallet, setWallet] = useState({
    profileCompleted: false,
    health: { linked: false, verified: false },
    farm: { linked: false, verified: false },
    city: { linked: false, verified: false },
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD WALLET ================= */

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    const token = JSON.parse(stored).token;

    fetch("http://localhost:5000/api/identity/wallet", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setWallet(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, [navigate]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <div style={{ padding: 80 }}>Loading identity wallet...</div>;
  }

  /* ================= DASHBOARD ================= */

  return (
    <div style={layout.page}>
      <header style={headerStyles.container}>
        <h1 style={headerStyles.title}>Pehchaan</h1>

        <button onClick={handleLogout} style={headerStyles.logoutButton}>
          🚪 Logout
        </button>
      </header>

      <main style={dashboardStyles.wrapper}>
        <div style={dashboardStyles.applicationSection}>
          {!wallet.profileCompleted && (
            <button
              onClick={() => navigate("/profile")}
              style={{
                marginBottom: 30,
                padding: "12px 18px",
                borderRadius: 12,
                border: "none",
                background: "#111",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Complete Identity Profile
            </button>
          )}
          {wallet.profileCompleted && (
            <div
              style={{
                padding: 20,
                borderRadius: 16,
                background: "#ffffff",
                boxShadow: "0 10px 20px rgba(0,0,0,.08)",
                marginBottom: 30,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ marginBottom: 6 }}>Identity Profile</h3>
                <p style={{ color: "#666" }}>
                  Your digital identity profile is active
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                style={{
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: "#111",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View / Edit
              </button>
            </div>
          )}

          <div style={dashboardStyles.grid}>
            {/* HEALTH */}
            <SectorCard
              title="Patient Hub"
              description="Secure medical identity access"
              status={
                wallet.health.verified
                  ? "Verified"
                  : wallet.health.linked
                    ? "Linked"
                    : "Not Linked"
              }
              actionLabel={
                wallet.health.verified
                  ? null
                  : wallet.health.linked
                    ? "Verify Health Identity"
                    : "Complete Profile First"
              }
              onAction={() => {
                if (!wallet.health.linked) {
                  navigate("/profile");
                } else {
                  navigate("/provider-auth/health");
                }
              }}
              bgColor={colors.sage}
              textColor="#ffffff"
              icon={<HealthIcon />}
            />

            {/* FARM */}
            <SectorCard
              title="Farmer Portal"
              description="Agriculture registry access"
              status={
                wallet.farm.verified
                  ? "Verified"
                  : wallet.farm.linked
                    ? "Linked"
                    : "Not Linked"
              }
              actionLabel={
                wallet.farm.verified
                  ? null
                  : wallet.farm.linked
                    ? "Verify Farmer Identity"
                    : "Complete Profile First"
              }
              onAction={() => {
                if (!wallet.farm.linked) {
                  navigate("/profile");
                } else {
                  navigate("/provider-auth/farm");
                }
              }}
              bgColor={colors.wood}
              textColor={colors.charcoal}
              icon={<AgricultureIcon />}
            />

            {/* CITY */}
            <SectorCard
              title="Smart City"
              description="Resident services access"
              status={
                wallet.city.verified
                  ? "Verified"
                  : wallet.city.linked
                    ? "Linked"
                    : "Not Linked"
              }
              actionLabel={
                wallet.city.verified
                  ? null
                  : wallet.city.linked
                    ? "Verify City Identity"
                    : "Complete Profile First"
              }
              onAction={() => {
                if (!wallet.city.linked) {
                  navigate("/profile");
                } else {
                  navigate("/provider-auth/city");
                }
              }}
              bgColor={colors.charcoal}
              textColor={colors.yellow}
              icon={<CityIcon />}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
