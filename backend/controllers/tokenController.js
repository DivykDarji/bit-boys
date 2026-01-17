const Consent = require("../models/Consent");
const { generateToken } = require("../utils/jwtUtils");

exports.issueToken = async (req, res) => {
  const { userId, clientId } = req.body;

  const consent = await Consent.findOne({
    userId,
    clientId,
    status: "active",
    expiryTime: { $gt: new Date() }
  });

  if (!consent) return res.status(403).json({ error: "No consent" });

  const token = generateToken({
    userId,
    clientId,
    scopes: consent.allowedScopes
  });

  res.json({ token });
};
