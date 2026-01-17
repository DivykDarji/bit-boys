export const colors = {
  charcoal: "#3d3d3d",
  yellow: "#e6c84c",
  red: "#d9534f",
  sage: "#8a9a5b",
  wood: "#d2b48c",

  grayText: "#6b6b6b",
  border: "#e5e7eb",
  pageBg: "#f5f5f5",

  shadow: "0 14px 36px rgba(61,61,61,0.12)",
};

/* ================= LAYOUT ================= */

export const layout = {
  page: {
    minHeight: "100vh",
    backgroundColor: colors.pageBg,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
};

/* ================= HEADER ================= */

export const headerStyles = {
  container: {
    padding: "28px 48px",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  title: {
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: "-0.04em",
    textTransform: "capitalize",
  },

  logoutButton: {
    position: "absolute",
    right: 48,

    display: "flex",
    alignItems: "center",
    gap: "8px",

    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",

    background: "linear-gradient(135deg, #d9534f, #c0392b)",
    color: "#ffffff",

    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "0.4px",

    cursor: "pointer",

    boxShadow: "0 10px 24px rgba(217,83,79,0.35)",
    transition: "all 0.25s ease",
  },

  logoutHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 14px 30px rgba(217,83,79,0.45)",
  },

  logoutActive: {
    transform: "scale(0.96)",
  },
};

/* ================= DASHBOARD ================= */

export const dashboardStyles = {
  wrapper: {
    flex: 1,
    padding: 80,
    display: "flex",
    justifyContent: "center",
  },

  applicationSection: {
    maxWidth: 1200,
    width: "100%",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 32,
  },

  sectorCard: {
    borderRadius: 24,
    overflow: "hidden",
    background: "#ffffff",
    boxShadow: colors.shadow,
    transition: "transform 0.25s ease",
  },

  cardTop: {
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    width: 64,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardBottom: {
    padding: 28,
    border: `1px solid ${colors.border}`,
    borderTop: "none",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 900,
    textTransform: "capitalize",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.grayText,
  },
};
