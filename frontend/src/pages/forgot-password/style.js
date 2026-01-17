export const styles = {
  // ================= MAIN CONTAINER =================
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f3ee 0%, #e6d4b8 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },

  // ================= BACKGROUND PATTERN =================
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `
      repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(138, 154, 91, 0.1) 35px, rgba(138, 154, 91, 0.1) 70px),
      repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(192, 21, 47, 0.1) 35px, rgba(192, 21, 47, 0.1) 70px)
    `,
    pointerEvents: "none",
    zIndex: 1,
  },

  // ================= CARD =================
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    padding: "3.5rem 3rem",
    borderRadius: "28px",
    boxShadow: "0 24px 60px rgba(138, 154, 91, 0.15)",
    border: "1px solid rgba(138, 154, 91, 0.1)",
    position: "relative",
    zIndex: 10,
    backdropFilter: "blur(10px)",
  },

  // ================= TITLE & SUBTITLE =================
  title: {
    textAlign: "center",
    marginBottom: "0.75rem",
    color: "#3d3d3d",
    fontSize: "1.9rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "2.5rem",
    color: "#5a5a5a",
    fontSize: "0.98rem",
    fontWeight: "500",
    letterSpacing: "0.3px",
    lineHeight: "1.6",
  },

  // ================= FORM =================
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },

  label: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#3d3d3d",
    letterSpacing: "0.2px",
  },

  // ================= INPUTS =================
  input: {
    width: "100%",
    height: "50px",
    padding: "0 16px",
    borderRadius: "12px",
    border: "1.5px solid #e8ddc8",
    fontSize: "0.96rem",
    outline: "none",
    background: "#faf9f7",
    boxSizing: "border-box",
    color: "#3d3d3d",
    transition: "all 0.3s ease",
    letterSpacing: "0.2px",
  },

  inputFocus: {
    borderColor: "#8a9a5b",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(138, 154, 91, 0.1)",
  },

  inputHover: {
    borderColor: "#d4c9b4",
    backgroundColor: "#ffffff",
  },

  // ================= BUTTONS =================
  submitBtn: {
    height: "52px",
    background: "linear-gradient(135deg, #8a9a5b 0%, #778850 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    fontSize: "0.96rem",
    marginTop: "0.5rem",
    boxShadow: "0 8px 20px rgba(138, 154, 91, 0.25)",
  },

  submitBtnHover: {
    background: "linear-gradient(135deg, #778850 0%, #6b7648 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 32px rgba(138, 154, 91, 0.35)",
  },

  submitBtnActive: {
    transform: "translateY(-1px)",
    boxShadow: "0 6px 16px rgba(138, 154, 91, 0.25)",
  },

  submitBtnDisabled: {
    opacity: "0.65",
    cursor: "not-allowed",
    transform: "none",
  },

  // ================= TEXT LINK BUTTON (NO BORDER) =================
  backLink: {
    background: "none",
    border: "none",
    color: "#8a9a5b",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0",
    textDecoration: "none",
    transition: "color 0.3s ease",
    letterSpacing: "0.2px",
    marginTop: "1.5rem",
    textAlign: "center",
    display: "block",
    width: "100%",
  },

  backLinkHover: {
    color: "#e6c84c",
    textDecoration: "underline",
  },

  // ================= FOOTER LINKS =================
  footerLinks: {
    textAlign: "center",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e8ddc8",
  },

  footerText: {
    color: "#5a5a5a",
    fontSize: "0.9rem",
    margin: "0 0 0.8rem 0",
  },

  link: {
    color: "#8a9a5b",
    textDecoration: "none",
    fontWeight: "700",
    transition: "color 0.3s ease",
    letterSpacing: "0.2px",
    cursor: "pointer",
  },

  linkHover: {
    color: "#e6c84c",
    textDecoration: "underline",
  },

  // ================= LOADING STATE =================
  loadingState: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  // ================= SUCCESS STATE =================
  successMessage: {
    padding: "12px 16px",
    background: "rgba(138, 154, 91, 0.1)",
    border: "1px solid #8a9a5b",
    borderRadius: "10px",
    color: "#8a9a5b",
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "500",
  },

  // ================= ERROR STATE =================
  errorMessage: {
    padding: "12px 16px",
    background: "rgba(192, 21, 47, 0.1)",
    border: "1px solid #c0152f",
    borderRadius: "10px",
    color: "#c0152f",
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "500",
  },

  // ================= RESPONSIVE DESIGN =================
  "@media (max-width: 768px)": {
    card: {
      padding: "2.5rem 2rem",
      borderRadius: "20px",
    },
    title: {
      fontSize: "1.6rem",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "0.9rem",
      marginBottom: "1.8rem",
    },
    form: {
      gap: "1.2rem",
    },
    input: {
      height: "46px",
      fontSize: "0.92rem",
    },
    submitBtn: {
      height: "48px",
      fontSize: "0.92rem",
      letterSpacing: "0.5px",
    },
  },

  "@media (max-width: 480px)": {
    container: {
      padding: "16px",
    },
    card: {
      padding: "2rem 1.5rem",
      borderRadius: "18px",
      maxWidth: "100%",
    },
    title: {
      fontSize: "1.4rem",
    },
    subtitle: {
      fontSize: "0.88rem",
      marginBottom: "1.5rem",
    },
    input: {
      height: "44px",
      fontSize: "0.9rem",
      borderRadius: "10px",
    },
    submitBtn: {
      height: "46px",
      fontSize: "0.9rem",
      letterSpacing: "0.4px",
    },
    backLink: {
      fontSize: "0.9rem",
    },
  },

  // ================= UTILITIES =================
  media: {
    mobile: "@media (max-width: 480px)",
    tablet: "@media (max-width: 768px)",
    desktop: "@media (min-width: 769px)",
  },
};