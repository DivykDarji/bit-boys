import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./farm_style"; // Import in ProviderFarm.jsx

const ProviderFarm = () => {
  const navigate = useNavigate();

  const startLink = () => {
    navigate("/authorize?scope=farm&redirectUri=/dashboard");
  };

  return (
    // <div style={{ padding: 40 }}>
    //   <h2>National Agriculture Registry</h2>
    //   <p>Verify identity to link farmer record.</p>

    //   <button onClick={startLink}>
    //     Start Face Verification
    //   </button>
    // </div>

    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.farmIcon}>🌾</div> {/* or SVG */}
        <div style={styles.header}>
          <h2 style={styles.title}>National Agriculture Registry</h2>
          <p style={styles.subtitle}>Verify identity to link farmer record.</p>
        </div>
        <button style={styles.startBtn} onClick={startLink}>
          Start Face Verification
        </button>
      </div>
    </div>
  );
};

export default ProviderFarm;
