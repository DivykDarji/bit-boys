import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./health_style"; // Import in your ProviderHealth.jsx

const ProviderHealth = () => {
  const navigate = useNavigate();

  const startLink = () => {
    navigate("/authorize?scope=health&redirectUri=/dashboard");
  };

  return (
    // <div style={{ padding: 40 }}>
    //   <h2>CityCare Hospital Verification</h2>
    //   <p>Verify identity to link official health record.</p>

    //   <button onClick={startLink}>
    //     Start Face Verification
    //   </button>
    // </div>
    // In your ProviderHealth.jsx
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>CityCare Hospital Verification</h2>
          <p style={styles.subtitle}>
            Verify identity to link official health record.
          </p>
        </div>

        <button style={styles.startBtn} onClick={startLink}>
          Start Face Verification
        </button>
      </div>
    </div>
  );
};

export default ProviderHealth;
