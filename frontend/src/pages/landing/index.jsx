import React, { useState, useEffect } from "react";
import { Lock, Shield, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hospital, Tractor, Building2 } from "lucide-react";
import { styles } from "./styles";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredApp, setHoveredApp] = useState(null);

  const navigate = useNavigate();

  /* ================= ANIMATION ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  /* ================= NAVIGATION ================= */
  const handleGetStarted = () => {
    navigate("/register");
  };

 

  return (
    <div style={styles.body}>
      {/* ================= NAVBAR ================= */}
      <header style={styles.navbar.container}>
        <h1 style={styles.navbar.title}>Pehchaan</h1>

       
      </header>

      {/* ================= HERO ================= */}
      <section
        style={{
          ...styles.hero,
          ...(styles.fadeIn ? styles.fadeIn(isVisible, 0) : {}),
        }}
      >
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>User centric security</div>

          <h1 style={styles.heroTitle}>
            Privacy-Centric Digital Identity Platform
          </h1>

          <p style={styles.heroSubtitle}>
            Secure, user-controlled digital identity infrastructure for
            healthcare, agriculture, and smart city services.
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryBtn}
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.primaryBtnHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, { ...styles.primaryBtn });
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        <div style={styles.heroImage}>
          <div style={styles.illustrationHero}>
            <div style={styles.heroLine} />
            <div style={styles.heroLine} />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
          <p style={styles.sectionSubtitle}>
            Security with user-first privacy controls.
          </p>
        </div>

        <div style={styles.grid}>
          {[
            {
              icon: Lock,
              title: "User-Controlled Privacy",
              text: "Granular consent management with real-time access control.",
              bullets: ["✓ Real-time consent", "✓ One-click revoke"],
            },
            {
              icon: Shield,
              title: "Multi-Factor Authentication",
              text: "Biometrics, OTP, cryptographic proof authentication.",
              bullets: ["✓ Biometrics", "✓ OTP"],
            },
            {
              icon: BarChart3,
              title: "Consent Dashboard",
              text: "Live access logs and permission analytics.",
              bullets: ["✓ Access timeline"],
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                style={{
                  ...styles.featureCard,
                  ...(hoveredFeature === idx ? styles.featureCardHover : {}),
                }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  style={{
                    ...styles.featureIcon,
                    ...(hoveredFeature === idx ? styles.featureIconHover : {}),
                  }}
                >
                  <Icon size={56} strokeWidth={1.5} color="#8a9a5b" />
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureText}>{feature.text}</p>
                {feature.bullets.map((bullet, bulletIdx) => (
                  <div
                    key={bulletIdx}
                    style={{
                      ...styles.featureBullet,
                      ...(hoveredFeature === idx
                        ? styles.featureBulletHover
                        : {}),
                    }}
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section style={styles.applicationsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Real-World Applications</h2>
          <p style={styles.sectionSubtitle}>
            Deployed across critical government services.
          </p>
        </div>

        <div style={styles.appGrid}>
          {[
            {
              icon: Hospital,
              title: "Health Identity Portal",
              description: "Secure medical identity & emergency consent.",
            },
            {
              icon: Tractor,
              title: "Farmer & Land Registry",
              description: "Land records and subsidy verification.",
            },
            {
              icon: Building2,
              title: "Smart City Services",
              description: "Citizen identity for municipal services.",
            },
          ].map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                style={{
                  ...styles.appCard,
                  ...(hoveredApp === idx ? styles.appCardHover : {}),
                }}
                onMouseEnter={() => setHoveredApp(idx)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div
                  style={{
                    ...styles.appIcon,
                    ...(hoveredApp === idx ? styles.appIconHover : {}),
                  }}
                >
                  <Icon size={64} strokeWidth={1.5} color="#8a9a5b" />
                </div>
                <h3
                  style={{
                    ...styles.appTitle,
                    ...(hoveredApp === idx ? styles.appTitleHover : {}),
                  }}
                >
                  {app.title}
                </h3>
                <p style={styles.appDescription}>{app.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}></div>

          <div style={styles.footerLinks}>
            {["Privacy", "Terms", "Security", "Contact"].map((link) => (
              <a
                key={link}
                style={styles.footerLink}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.footerLinkHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, styles.footerLink);
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={styles.footerBottom}>
            © 2026 Pehchaan Digital Identity Platform
          </div>
        </div>
      </footer>
    </div>
  );
}