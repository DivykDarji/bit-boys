export const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* ================= LEFT IMAGE ================= */

  leftSection: {
    flex: 1,
    background:
      "url('https://i.postimg.cc/yYgBtvFg/face.jpg')",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "contain",
    color: "white",
  },

  imagePlaceholder: {
    width: "10%",
    height: "10%",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: 600,
    letterSpacing: "1px",
  },

  /* ================= RIGHT LOGIN ================= */

  rightSection: {
    flex: 1,
    background: "#d2b48c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "2.8rem",
    borderRadius: "22px",
    boxShadow: "0 20px 50px rgba(138,154,91,0.15)",
    border: "1px solid rgba(138,154,91,0.12)",
  },

  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#3d3d3d",
    fontSize: "1.7rem",
    fontWeight: 800,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#666",
    fontSize: "0.95rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  label: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#3d3d3d",
  },

  input: {
    height: "46px",
    padding: "0 16px",
    borderRadius: "10px",
    border: "1px solid #e8ddc8",
    background: "#faf9f7",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
  },

  passwordContainer: {
    position: "relative",
  },

  passwordToggle: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#8a9a5b",
  },

  submitBtn: {
    height: "48px",
    background: "#8a9a5b",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "0.8rem",
  },

  footerLinks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.6rem",
    paddingTop: "1.2rem",
    borderTop: "1px solid #e8ddc8",
  },

  link: {
    color: "#8a9a5b",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
  },

  footerSeparator: {
    color: "#8a9a5b",
    fontSize: "1.1rem",
  },
};
