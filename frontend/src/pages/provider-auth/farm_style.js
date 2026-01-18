export const styles = {
  /* ================= BODY ================= */
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f8faf5",
    color: "#3d3d3d",
    lineHeight: "1.6",
    overflowX: "hidden",
  },

  /* ================= ANIMATIONS ================= */
  fadeIn: (isVisible, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease-in ${delay}s, transform 0.6s ease-in ${delay}s`,
    willChange: "opacity, transform",
  }),

  slideInLeft: (isVisible, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  }),

  slideInRight: (isVisible, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(30px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  }),

  /* ================= CONTAINER ================= */
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f8faf5 0%, #e8f5e8 100%)",
    maxWidth: 1200,
    marginInline: "auto",
    paddingInline: 20,
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "64px 48px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    border: "1px solid #e9ecef",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },

  cardBefore: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #8a9a5b, #a8b98a, #8a9a5b)",
  },

  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 30px 80px rgba(138,154,91,0.15)",
    borderColor: "rgba(138,154,91,0.2)",
  },

  /* ================= HEADER ================= */
  header: {
    marginBottom: "40px",
  },

  title: {
    fontSize: "32px",
    fontWeight: 800,
    margin: "0 0 16px 0",
    color: "#2c3e50",
    letterSpacing: "-0.02em",
    transition: "all 0.3s ease",
  },

  subtitle: {
    fontSize: "16px",
    color: "#6c757d",
    margin: 0,
    lineHeight: "1.7",
    transition: "color 0.3s ease",
  },

  /* ================= FARM ICON ================= */
  farmIcon: {
    width: "90px",
    height: "90px",
    margin: "0 auto 32px",
    background: "linear-gradient(135deg, rgba(138,154,91,0.12), rgba(168,185,138,0.08))",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    border: "1px solid rgba(138,154,91,0.2)",
    fontSize: "48px",
  },

  farmIconHover: {
    background: "linear-gradient(135deg, rgba(138,154,91,0.18), rgba(168,185,138,0.12))",
    transform: "scale(1.08) rotate(2deg)",
    borderColor: "rgba(138,154,91,0.3)",
  },

  /* ================= BUTTON ================= */
  startBtn: {
    position: "relative",
    padding: "18px 48px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #8a9a5b 0%, #778850 100%)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    boxShadow: "0 8px 25px rgba(138,154,91,0.3)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  startBtnHover: {
    background: "linear-gradient(135deg, #778850 0%, #6a7c48 100%)",
    transform: "translateY(-4px)",
    boxShadow: "0 16px 40px rgba(138,154,91,0.4)",
  },

  startBtnActive: {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 30px rgba(138,154,91,0.35)",
  },

  /* ================= RESPONSIVE ================= */
  "@media (max-width: 768px)": {
    container: {
      padding: "30px 16px",
    },
    card: {
      padding: "48px 32px",
      margin: "20px",
    },
    title: {
      fontSize: "28px",
    },
    startBtn: {
      padding: "16px 36px",
      fontSize: "15px",
    },
  },

  "@media (max-width: 480px)": {
    title: {
      fontSize: "24px",
    },
    card: {
      padding: "40px 24px",
    },
  },
};
