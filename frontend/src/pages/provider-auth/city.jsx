import React from "react";
import { useNavigate } from "react-router-dom";
import { cityStyles } from "./cityStyles";

const ProviderCity = () => {
  const navigate = useNavigate();

  const startLink = () => {
    navigate("/authorize?scope=city&redirectUri=/dashboard");
  };

  return (
    <div style={cityStyles.cityHeroSection}>
      <div style={cityStyles.cityContent}>
        <span style={cityStyles.cityBadge}>Smart City Authority</span>
        
        <h1 style={cityStyles.cityTitle}>
          Verify Identity
        </h1>
        
        <p style={cityStyles.cityDescription}>
          Verify identity to link resident address.
        </p>

        <div style={cityStyles.cityBenefits}>
          <div style={cityStyles.benefitItem}>
            <div style={cityStyles.benefitIcon}>✓</div>
            <span style={cityStyles.benefitText}>
              Secure face recognition verification
            </span>
          </div>
          <div style={cityStyles.benefitItem}>
            <div style={cityStyles.benefitIcon}>✓</div>
            <span style={cityStyles.benefitText}>
              Link your official resident records
            </span>
          </div>
          <div style={cityStyles.benefitItem}>
            <div style={cityStyles.benefitIcon}>✓</div>
            <span style={cityStyles.benefitText}>
              Instant verification within minutes
            </span>
          </div>
        </div>

        <div style={cityStyles.cityButtons}>
          <button
            onClick={startLink}
            style={cityStyles.primaryBtn}
            onMouseEnter={(e) => 
              Object.assign(e.target.style, cityStyles.primaryBtnHover)
            }
            onMouseLeave={(e) => 
              Object.assign(e.target.style, {
                backgroundColor: "#8a9a5b",
                boxShadow: "0 4px 15px rgba(138,154,91,.3)",
                transform: "none"
              })
            }
          >
            Start Face Verification
          </button>
        </div>
      </div>

      <div style={cityStyles.cityImage}>
        <div style={cityStyles.cityIllustration}>
          <div style={{ textAlign: "center", color: "#8a9a5b" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏛️</div>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
              City Authority Verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCity;