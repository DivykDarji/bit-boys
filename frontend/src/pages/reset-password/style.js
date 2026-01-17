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
  },

  // ================= CARD =================
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    padding: "3rem 2.5rem",
    borderRadius: "24px",
    boxShadow: "0 24px 60px rgba(138, 154, 91, 0.15)",
    border: "1px solid rgba(138, 154, 91, 0.1)",
  },

  // ================= TITLE & SUBTITLE =================
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#3d3d3d",
    fontSize: "1.8rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#8a9a5b",
    fontSize: "0.95rem",
    fontWeight: "500",
    letterSpacing: "0.3px",
  },

  // ================= FORM =================
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
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

  // ================= PASSWORD INPUT WRAPPER =================
  passwordInputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  // ================= INPUTS =================
  input: {
    width: "100%",
    height: "48px",
    padding: "0 16px",
    paddingRight: "48px",
    borderRadius: "12px",
    border: "1.5px solid #e8ddc8",
    fontSize: "0.95rem",
    outline: "none",
    background: "#faf9f7",
    boxSizing: "border-box",
    color: "#3d3d3d",
    transition: "all 0.3s ease",
  },

  inputFocus: {
    borderColor: "#8a9a5b",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(138, 154, 91, 0.1)",
  },

  // ================= EYE BUTTON =================
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#8a9a5b",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    borderRadius: "6px",
  },

  eyeButtonHover: {
    color: "#778850",
    backgroundColor: "rgba(138, 154, 91, 0.08)",
  },

  // ================= BUTTONS =================
  submitBtn: {
    height: "50px",
    background: "#8a9a5b",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.95rem",
    marginTop: "0.8rem",
  },

  submitBtnHover: {
    background: "#778850",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(138, 154, 91, 0.3)",
  },

  submitBtnActive: {
    transform: "translateY(0)",
    boxShadow: "0 4px 12px rgba(138, 154, 91, 0.2)",
  },

  // ================= CENTER LINK WRAPPER =================
  centerLink: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.5rem",
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
    textAlign: "center",
  },

  backLinkHover: {
    color: "#8a9a5b",
    textDecoration: "underline",
  },

  // ================= FOOTER LINKS =================
  footerLinks: {
    textAlign: "center",
    marginTop: "1.5rem",
    paddingTop: "1.2rem",
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
    color: "#8a9a5b",
    textDecoration: "underline",
  },

  // ================= RESPONSIVE UTILITIES =================
  media: {
    mobile: "@media (max-width: 480px)",
    tablet: "@media (max-width: 768px)",
    desktop: "@media (min-width: 769px)",
  },
};