const User = require("../models/User");
const AccessLog = require("../models/AccessLog");

exports.getMyData = async (req, res) => {
  const user = await User.findById(req.user.userId);

  let response = {};

  if (req.user.scopes.includes("profile")) {
    response.profile = user.profile;
  }

  await AccessLog.create({
    userId: user._id,
    clientId: req.user.clientId,
    scopesAccessed: req.user.scopes
  });

  res.json(response);
};
