const Consent = require("../models/Consent");
const User = require("../models/User");
const biometric = require("../services/biometricClient");

exports.requestConsent = async (req, res) => {
  const consent = await Consent.create(req.body);
  res.json(consent);
};

exports.approveConsent = async (req, res) => {
  const { consentId, faceImage } = req.body;

  const consent = await Consent.findById(consentId);
  const user = await User.findById(consent.userId);

  const verify = await biometric.verifyFace(
    faceImage,
    JSON.parse(user.faceEmbeddingId)
  );

  if (!verify.match) return res.status(401).json({ error: "Face mismatch" });

  consent.status = "active";
  await consent.save();

  res.json({ success: true });
};

exports.revokeConsent = async (req, res) => {
  await Consent.findByIdAndUpdate(req.body.consentId, {
    status: "revoked"
  });

  res.json({ success: true });
};
