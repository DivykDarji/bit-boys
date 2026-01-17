const User = require("../models/User");
const biometric = require("../services/biometricClient");
const fs = require("fs");
const crypto = require("crypto");
const mailService = require("../services/mailService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.getWallet = async (req, res) => {
  const user = await User.findById(req.user.userId);

  // HARD SAFETY GUARD
  const profile = user.profile || {};

  res.json({
    health: {
      linked: !!profile.healthId,
      verified: profile.healthVerified || false,
      source: profile.healthSource || null,
    },
    farm: {
      linked: !!profile.farmerId,
      verified: profile.farmerVerified || false,
      source: profile.farmerSource || null,
    },
    city: {
      linked: !!profile.address,
      verified: profile.cityVerified || false,
      source: profile.citySource || null,
    },
    trustLevel: user.trustLevel || "Basic",
  });
};
