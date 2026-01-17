const mongoose = require("mongoose");

const ConsentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,

  clientId: String,

  allowedScopes: [String],

  expiryTime: Date,

  status: {
    type: String,
    enum: ["active", "revoked"],
    default: "active"
  }
});

module.exports = mongoose.model("Consent", ConsentSchema);
