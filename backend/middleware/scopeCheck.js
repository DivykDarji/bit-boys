module.exports = (requiredScope) => {
  return (req, res, next) => {
    if (!req.user.scopes.includes(requiredScope)) {
      return res.status(403).json({ error: "Scope not allowed" });
    }
    next();
  };
};
