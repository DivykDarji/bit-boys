const mongoose = require("mongoose");

const AccessLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  clientId: String,
  scopesAccessed: [String],

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AccessLog", AccessLogSchema);
    