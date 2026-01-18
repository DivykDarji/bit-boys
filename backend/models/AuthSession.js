const mongoose = require("mongoose");

const AuthSessionSchema = new mongoose.Schema({
  userId: String,
  scope: String,
  redirectUri: String,
  expiresAt: Date,
});

module.exports = mongoose.model("AuthSession", AuthSessionSchema);
