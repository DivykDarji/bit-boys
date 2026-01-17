export const styles = {
  /* ================= BODY ================= */
  body: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff",
    color: "#3d3d3d",
    lineHeight: "1.6",
    overflowX: "hidden",
  },

  /* ================= ANIMATIONS ================= */
  fadeIn: (isVisible, delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease-in ${delay}s, transform 0.6s ease-in ${delay}s`,
    willChange: "opacity, transform",
  }),

  slideInLeft: (isVisible, delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  }),

  slideInRight: (isVisible, delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(30px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  }),

  /* ================= NAVBAR ================= */
  navbar: {
    container: {
      padding: "20px 48px",
      borderBottom: "1px solid #e8ddc8",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      transition: "all 0.3s ease",
    },

    title: {
      fontSize: 34,
      fontWeight: 900,
      letterSpacing: "-0.04em",
      color: "#3d3d3d",
      margin: 0,
      cursor: "pointer",
      transition: "color 0.3s ease",
    },

    button: {
      position: "relative",
      padding: "12px 28px",
      borderRadius: "999px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 700,
      color: "#ffffff",
      background: "linear-gradient(135deg,#8a9a5b,#778850)",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      outline: "none",
    },

    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 14px 30px rgba(138,154,91,0.45)",
    },

    buttonActive: {
      transform: "scale(0.96)",
    },
  },

  /* ================= HERO ================= */
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "100px 80px",
    background: "linear-gradient(135deg, #f5f3ee 0%, #e6d4b8 100%)",
    minHeight: "100vh",
    gap: "80px",
    transition: "all 0.6s ease",
  },

  heroContent: {
    flex: 1,
    maxWidth: "600px",
    zIndex: 2,
  },

  heroBadge: {
    backgroundColor: "rgba(138,154,91,0.18)",
    color: "#8a9a5b",
    padding: "10px 20px",
    borderRadius: "24px",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: 24,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    border: "1px solid rgba(138,154,91,0.35)",
    display: "inline-block",
    transition: "all 0.3s ease",
  },

  heroTitle: {
    fontSize: "56px",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 24,
    color: "#3d3d3d",
    transition: "color 0.3s ease",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#5a5a5a",
    marginBottom: 32,
    lineHeight: 1.8,
    transition: "color 0.3s ease",
  },

  heroButtons: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "16px 40px",
    backgroundColor: "#8a9a5b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(138,154,91,.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "16px",
    outline: "none",
  },

  primaryBtnHover: {
    backgroundColor: "#778850",
    boxShadow: "0 8px 25px rgba(138,154,91,.4)",
    transform: "translateY(-2px)",
  },

  primaryBtnActive: {
    transform: "translateY(0)",
    boxShadow: "0 4px 12px rgba(138,154,91,.3)",
  },

  heroImage: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "float 3s ease-in-out infinite",
  },

  illustrationHero: {
    width: "650px",
    height: "650px",
    backgroundImage:
      'url("https://i.ibb.co/LzMv3nB2/ilust.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "28px",
    transition: "all 0.3s ease",
    border: "none",
  },

  heroLine: {
    width: "100%",
    height: "1px",
    marginBottom: "20px",
  },

  /* ================= SECTION ================= */
  section: {
    padding: "100px 80px",
    transition: "all 0.3s ease",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: 80,
    maxWidth: 650,
    marginInline: "auto",
  },

  sectionTitle: {
    fontSize: "48px",
    fontWeight: 800,
    marginBottom: 16,
    color: "#3d3d3d",
    transition: "color 0.3s ease",
  },

  sectionSubtitle: {
    fontSize: "18px",
    color: "#5a5a5a",
    transition: "color 0.3s ease",
  },

  /* ================= GRID ================= */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 32,
  },

  featureCard: {
    padding: "48px 40px",
    backgroundColor: "#faf9f7",
    borderRadius: 16,
    border: "1px solid #e8ddc8",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },

  featureCardHover: {
    backgroundColor: "#ffffff",
    boxShadow: "0 12px 40px rgba(138,154,91,0.12)",
    transform: "translateY(-4px)",
    borderColor: "rgba(138,154,91,0.3)",
  },

  featureIcon: {
    marginBottom: 20,
    transition: "all 0.3s ease",
  },

  featureIconHover: {
    transform: "scale(1.1) rotate(5deg)",
  },

  featureTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 14,
    color: "#3d3d3d",
    transition: "color 0.3s ease",
  },

  featureText: {
    color: "#5a5a5a",
    marginBottom: 20,
    transition: "color 0.3s ease",
  },

  featureBullet: {
    fontSize: 14,
    fontWeight: 700,
    color: "#8a9a5b",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },

  featureBulletHover: {
    paddingLeft: 8,
    color: "#778850",
  },

  /* ================= APPLICATIONS SECTION ================= */
  applicationsSection: {
    padding: "100px 80px",
    backgroundColor: "#faf9f7",
    transition: "all 0.3s ease",
  },

  appGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 40,
  },

  appCard: {
    padding: "48px 40px",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e8ddc8",
    textAlign: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    position: "relative",
  },

  appCardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 50px rgba(138,154,91,0.15)",
    borderColor: "rgba(138,154,91,0.4)",
  },

  appIcon: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },

  appIconHover: {
    transform: "scale(1.15) rotate(-10deg)",
  },

  appTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: "#3d3d3d",
    transition: "color 0.3s ease",
  },

  appTitleHover: {
    color: "#8a9a5b",
  },

  appDescription: {
    color: "#5a5a5a",
    fontSize: 16,
    lineHeight: 1.6,
    transition: "color 0.3s ease",
  },

  /* ================= FOOTER ================= */
  footer: {
    backgroundColor: "#3d3d3d",
    color: "#ffffff",
    padding: "60px 80px 40px",
    transition: "all 0.3s ease",
  },

  footerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: 60,
    alignItems: "start",
  },

  footerLogo: {
    color: "#e6c84c",
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  footerLogoHover: {
    color: "#f5d75f",
    transform: "scale(1.05)",
  },

  footerLinks: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  footerLink: {
    color: "#b8b8b8",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 14,
    fontWeight: 500,
  },

  footerLinkHover: {
    color: "#e6c84c",
    transform: "translateY(-2px)",
  },

  footerBottom: {
    marginTop: 30,
    fontSize: 13,
    textAlign: "center",
    color: "#7a7a7a",
    gridColumn: "1 / -1",
  },

  /* ================= RESPONSIVE ================= */
  "@media (max-width: 768px)": {
    hero: {
      padding: "60px 40px",
      flexDirection: "column",
      minHeight: "auto",
      gap: "40px",
    },
    heroTitle: {
      fontSize: "36px",
    },
    section: {
      padding: "60px 40px",
    },
    sectionTitle: {
      fontSize: "32px",
    },
    navbar: {
      padding: "20px 30px",
    },
    footerContent: {
      gridTemplateColumns: "1fr",
      gap: 30,
    },
  },

  "@media (max-width: 480px)": {
    hero: {
      padding: "40px 20px",
    },
    heroTitle: {
      fontSize: "28px",
    },
    heroSubtitle: {
      fontSize: "16px",
    },
    section: {
      padding: "40px 20px",
    },
    sectionTitle: {
      fontSize: "24px",
    },
    navbar: {
      padding: "15px 20px",
    },
  },
};
