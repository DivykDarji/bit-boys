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
    background: "url('https://i.postimg.cc/yYgBtvFg/face.jpg')",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  /* ================= RIGHT ================= */

  rightSection: {
    flex: 1,
    background: "#8a9a5b",
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

  input: {
    height: "46px",
    padding: "0 16px",
    borderRadius: "10px",
    border: "1px solid #e8ddc8",
    background: "#faf9f7",
    fontSize: "0.95rem",
    outline: "none",
  },

  submitBtn: {
    height: "48px",
    background: "#8a9a5b",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "0.5rem",
  },

  cameraBox: {
    padding: "1rem",
    borderRadius: "14px",
    background: "#faf9f7",
    border: "2px dashed #e6c84c",
    textAlign: "center",
  },

  video: {
    width: "100%",
    borderRadius: "12px",
    marginTop: "12px",
  },

  previewRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "12px",
  },

  previewImg: {
    width: "70px",
    height: "70px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "2px solid #8a9a5b",
  },

  footerLinks: {
    marginTop: "1.6rem",
    textAlign: "center",
    fontSize: "0.9rem",
  },

  link: {
    color: "#8a9a5b",
    fontWeight: 600,
    cursor: "pointer",
  },
};
