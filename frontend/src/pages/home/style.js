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
    padding: "22px 48px",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: "#ffffff",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: "-0.03em",
    color: colors.charcoal,
  },

  actionGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  logoutButton: {
    padding: "8px 14px",
    borderRadius: 10,

    border: "none",
    background: colors.red,

    color: "#ffffff",
    fontSize: 13,
    fontWeight: 700,

    cursor: "pointer",
    transition: "0.2s ease",
  },

  deleteButton: {
    padding: "8px 14px",
    borderRadius: 10,

    border: `1px solid ${colors.red}`,
    background: "#ffffff",

    color: colors.red,
    fontSize: 13,
    fontWeight: 700,

    cursor: "pointer",
    transition: "0.2s ease",
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
