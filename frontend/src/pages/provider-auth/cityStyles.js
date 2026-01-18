export const cityStyles = {
  /* ================= CONTAINER ================= */
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f7f9fb 0%, #e8eef5 100%)",
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
    position: "relative",
    overflow: "hidden",
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
  },

  subtitle: {
    fontSize: "16px",
    color: "#6c757d",
    margin: 0,
    lineHeight: "1.7",
  },

  /* ================= CITY ICON ================= */
  cityIcon: {
    width: "90px",
    height: "90px",
    margin: "0 auto 32px",
    background:
      "linear-gradient(135deg, rgba(138,154,91,0.15), rgba(168,185,138,0.1))",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    border: "1px solid rgba(138,154,91,0.25)",
  },

  /* ================= BUTTON ================= */
  startBtn: {
    marginTop: 30,
    padding: "18px 48px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
    color: "#ffffff",
    background: "linear-gradient(135deg, #8a9a5b 0%, #778850 100%)",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(138,154,91,0.3)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  /* ================= RESPONSIVE ================= */
  "@media (max-width: 768px)": {
    card: {
      padding: "48px 32px",
    },
    title: {
      fontSize: "28px",
    },
    startBtn: {
      padding: "16px 36px",
    },
  },

  "@media (max-width: 480px)": {
    card: {
      padding: "40px 24px",
    },
    title: {
      fontSize: "24px",
    },
  },
};
