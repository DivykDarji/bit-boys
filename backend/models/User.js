const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // password never returned by default
  },

  phone: String,

  profile: {
    healthId: String,
    farmerId: String,
    address: String,
  },

  faceEmbedding: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.length === 0 || v.length === 512;
      },
      message: "Face embedding must be 512 dimensions",
    },
    default: [],
  },

  faceImages: {
    type: [String],
    default: [],
  },

  faceEnrolled: {
    type: Boolean,
    default: false,
  },

  trustLevel: {
    type: String,
    enum: ["Basic", "Verified"],
    default: "Basic",
  },
  otp: String,
  otpExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
