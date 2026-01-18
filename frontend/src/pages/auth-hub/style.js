export const hubStyles = {
  /* ================= PAGE ================= */
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f3ee 0%, #e6d4b8 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "20px",
  },

  /* ================= CARD ================= */
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#ffffff",
    padding: "48px 40px",
    borderRadius: 24,
    border: "1px solid #e8ddc8",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "all 0.3s ease",
  },

  /* ================= LOGO ================= */
  logoContainer: {
    marginBottom: 40,
  },

  logo: {
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 4,
    color: "#3d3d3d",
    letterSpacing: "-0.03em",
    margin: "0 0 4px 0",
  },

  logoSubtitle: {
    fontSize: 14,
    color: "#8a9a5b",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    margin: 0,
  },

  /* ================= TEXT ================= */
  headline: {
    fontSize: 16,
    color: "#5a5a5a",
    marginBottom: 32,
    fontWeight: 500,
    margin: "0 0 32px 0",
  },

  /* ================= BUTTONS CONTAINER ================= */
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },

  /* ================= BUTTON ================= */
  button: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #e8ddc8",
    backgroundColor: "#faf9f7",
    color: "#3d3d3d",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    outline: "none",
  },

  buttonHover: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(138,154,91,0.45)",
    color: "#8a9a5b",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(138,154,91,0.25)",
  },

  buttonIcon: {
    fontSize: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= FOOTER ================= */
  footer: {
    paddingTop: 20,
    borderTop: "1px solid #e8ddc8",
  },

  footerText: {
    fontSize: 12,
    color: "#5a5a5a",
    margin: 0,
    fontWeight: 500,
    lineHeight: 1.4,
  },

  /* ================= RESPONSIVE ================= */
  "@media (max-width: 480px)": {
    card: {
      padding: "40px 24px",
      maxWidth: "100%",
    },
    logo: {
      fontSize: 28,
    },
    headline: {
      fontSize: 14,
    },
    button: {
      padding: "12px 14px",
      fontSize: 14,
    },
  },
};