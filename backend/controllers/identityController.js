const User = require("../models/User");
const biometric = require("../services/biometricClient");
const fs = require("fs");
const crypto = require("crypto");
const mailService = require("../services/mailService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSessions = new Map();
const Consent = require("../models/Consent");
const path = require("path");

exports.sendOTP = async (req, res) => {
  const { name, email, gender, password } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
      otp,
      otpExpiry: expiry,
    });
  } else {
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
  }

  await mailService.sendOTP(email, otp);

  res.json({
    success: true,
    message: "OTP sent to email",
    expiresAt: expiry,
  });
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false });
  }

  if (user.otp !== otp || user.otpExpiry < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired OTP",
    });
  }

  user.emailVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({
    success: true,
    message: "Email verified",
  });
};

// ================= REGISTER =================

exports.registerWithFace = async (req, res) => {
  const files = req.files;

  try {
    const { email } = req.body;

    if (!files || files.length !== 3) {
      return res.status(400).json({
        success: false,
        message: "Exactly 3 face images required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email not verified",
      });
    }

    const bioResult = await biometric.enrollFace(
      user._id.toString(),
      user.name,
      files,
    );

    user.faceEmbedding = bioResult.embedding;
    user.faceImages = bioResult.imagePaths;
    user.faceEnrolled = true;

    await user.save();

    res.json({
      success: true,
      message: "Identity registration completed",
    });
  } catch (error) {
    console.error("Biometric Error:", error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Face registration failed",
    });
  } finally {
    // Always cleanup temp files
    if (files) {
      files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
  }
};

// ================= VERIFY =================

exports.verifyFace = async (req, res) => {
  try {
    const { userId, imageBase64 } = req.body;

    const user = await User.findById(userId);

    if (!user || !user.faceEnrolled) {
      return res.status(404).json({
        success: false,
        message: "User not face enrolled",
      });
    }

    const result = await biometric.verifyFace(user.faceEmbedding, imageBase64);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified",
      });
    }
    // ✅ CREATE JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        trustLevel: user.trustLevel,
        faceEnrolled: user.faceEnrolled,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: true,
      message: "If account exists, reset email sent",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await mailService.sendResetLink(email, resetLink);

  res.json({
    success: true,
    message: "Reset link sent",
  });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: new Date() },
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;

  await user.save();

  res.json({
    success: true,
    message: "Password reset successful",
  });
};

// ================= WALLET =================

exports.getWallet = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const profile = user.profile || {};
  const consents = await Consent.find({
    userId: req.user.userId,
    status: "active",
  });

  const profileCompleted =
    profile.health?.bloodGroup ||
    profile.farm?.farmerId ||
    profile.city?.address;

  res.json({
    profileCompleted: !!profileCompleted,

    health: {
      linked: !!profile.health?.bloodGroup,
      verified: profile.health?.verified || false,
    },

    farm: {
      linked: !!profile.farm?.farmerId,
      verified: profile.farm?.verified || false,
    },

    city: {
      linked: !!profile.city?.address,
      verified: profile.city?.verified || false,
    },
    activeConsents: consents,
  });
};

// ====================================================
// ============ SIGN IN WITH PEHCHAAN =================
// ====================================================

// STEP 1 — START AUTHORIZATION

exports.startAuthorization = async (req, res) => {
  const { scope, redirectUri, clientId } = req.query;


  const token = crypto.randomBytes(20).toString("hex");

  authSessions.set(token, {
    userId: req.user.userId,
    scope,
    redirectUri,
    clientId,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  res.json({
    authToken: token,
    scope,
    clientId,
  });
};

// STEP 2 — CONSENT + FACE VERIFY

exports.approveAuthorization = async (req, res) => {
  const { authToken, imageBase64 } = req.body;

  const session = authSessions.get(authToken);

  if (!session || session.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Session expired" });
  }

  const user = await User.findById(session.userId);

  const result = await biometric.verifyFace(user.faceEmbedding, imageBase64);

  if (!result.match) {
    return res.status(401).json({ message: "Face failed" });
  }

  // ✅ MARK VERIFIED BASED ON SCOPE

  if (session.scope === "health") {
    user.profile.health.verified = true;
  }

  if (session.scope === "farm") {
    user.profile.farm.verified = true;
  }

  if (session.scope === "city") {
    user.profile.city.verified = true;
  }

  // Upgrade trust level
  user.trustLevel = "Verified";

  await user.save();

  const accessToken = jwt.sign(
    {
      userId: user._id,
      scope: session.scope,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
  );

  authSessions.delete(authToken);

  res.json({
    redirect: `${session.redirectUri}?token=${accessToken}`,
  });
};

// STEP 3 — SCOPED DATA

exports.getAuthorizedProfile = async (req, res) => {
  const { userId, scope } = req.user;

  const user = await User.findById(userId);
  const consent = await Consent.findOne({
    userId,
    allowedScopes: scope,
    status: "active",
  });

  if (!consent) {
    return res.status(403).json({
      message: "Access not granted",
    });
  }

  // Check expiry
  if (consent.expiryTime && consent.expiryTime < new Date()) {
    consent.status = "revoked";
    await consent.save();

    return res.status(403).json({
      message: "Access expired",
    });
  }

  const profile = user.profile || {};

  // HEALTH
  if (scope === "health") {
    if (!profile.health?.verified) {
      return res.status(403).json({
        message: "Health not verified",
      });
    }

    return res.json({
      bloodGroup: profile.health.bloodGroup,
      emergencyContact: profile.health.emergencyContact,
      verified: true,
    });
  }

  // FARM
  if (scope === "farm") {
    if (!profile.farm?.verified) {
      return res.status(403).json({
        message: "Farm not verified",
      });
    }

    return res.json({
      farmerId: profile.farm.farmerId,
      landId: profile.farm.landId,
      verified: true,
    });
  }

  // CITY
  if (scope === "city") {
    if (!profile.city?.verified) {
      return res.status(403).json({
        message: "City not verified",
      });
    }

    return res.json({
      address: profile.city.address,
      cityId: profile.city.cityId,
      verified: true,
    });
  }

  res.status(403).json({ message: "Invalid scope" });
};

// ================= SAVE USER PROFILE =================

exports.saveProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    const { health, farm, city } = req.body;

    user.profile = {
      health: {
        ...health,
        verified: false,
      },
      farm: {
        ...farm,
        verified: false,
      },
      city: {
        ...city,
        verified: false,
      },
    };

    await user.save();

    res.json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile save failed" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.json({
      profile: user.profile || {},
      trustLevel: user.trustLevel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

exports.saveConsent = async (req, res) => {
  try {
    const { authToken, duration, customMinutes } = req.body;

    const session = authSessions.get(authToken);

    if (!session || session.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Authorization session expired" });
    }

    let expiryTime = null;

    if (duration === "10m") {
      expiryTime = new Date(Date.now() + 10 * 60 * 1000);
    }

    if (duration === "custom") {
      expiryTime = new Date(Date.now() + customMinutes * 60 * 1000);
    }

    // Save consent record
    const consent = await Consent.create({
      userId: session.userId,

      clientId: session.clientId,

      allowedScopes: [session.scope],

      expiryTime,

      status: "active",
    });

    res.json({
      success: true,
      consentId: consent._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Consent save failed" });
  }
};

exports.revokeConsent = async (req, res) => {
  try {
    const { consentId } = req.body;

    const consent = await Consent.findOne({
      _id: consentId,
      userId: req.user.userId,
    });

    if (!consent) {
      return res.status(404).json({ message: "Consent not found" });
    }

    consent.status = "revoked";

    await consent.save();

    res.json({
      success: true,
      message: "Access revoked",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Revoke failed" });
  }
};

// ================= INTERNAL VERIFICATION =================

exports.internalVerify = async (req, res) => {

  try {

    const { imageBase64, scope } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user || !user.faceEnrolled) {
      return res.status(400).json({ success: false });
    }

    const result = await biometric.verifyFace(
      user.faceEmbedding,
      imageBase64
    );

    if (!result.match) {
      return res.status(401).json({ success: false });
    }

    // Mark verified internally
    if (scope === "health") user.profile.health.verified = true;
    if (scope === "farm") user.profile.farm.verified = true;
    if (scope === "city") user.profile.city.verified = true;

    user.trustLevel = "Verified";

    await user.save();

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.deleteIdentity = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false });
    }

    // 1️⃣ Revoke consents
    await Consent.updateMany(
      { userId, status: "active" },
      { status: "revoked" }
    );

    // 2️⃣ Correct biometric storage base path
    const BASE_STORAGE = process.env.BIOMETRIC_STORAGE_PATH;

    // 3️⃣ Delete face images
    if (user.faceImages?.length) {
      user.faceImages.forEach((relativePath) => {

        const cleanPath = relativePath.replace(/^\/+/, "");

        const fullPath = path.join(BASE_STORAGE, cleanPath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }

      });

      // 4️⃣ Delete entire user folder
      const folderName = user.faceImages[0]
        .replace(/^\/+/, "")
        .split("/")[0];

      const userFolder = path.join(BASE_STORAGE, folderName);

      if (fs.existsSync(userFolder)) {
        fs.rmSync(userFolder, { recursive: true, force: true });
      }
    }

    // 5️⃣ Delete user from DB
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "Identity permanently deleted",
    });

  } catch (err) {
    console.error("Delete identity error:", err);
    res.status(500).json({
      success: false,
      message: "Identity deletion failed",
    });
  }
};

