const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid auth format" });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload
    req.user = decoded;

    next();

  } catch (err) {

    console.error("JWT verify failed:", err.message);

    return res.status(403).json({ error: "Token invalid or expired" });
  }
};
