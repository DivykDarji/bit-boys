  const router = require("express").Router();
  const upload = require("../middleware/upload");
  const ctrl = require("../controllers/identityController");
  const verify = require("../middleware/verifyToken");

  router.get("/wallet", verify, ctrl.getWallet);

  // Register user with 3 face images
  router.post("/register-face", upload.array("images", 3), ctrl.registerWithFace);

  router.post("/send-otp", ctrl.sendOTP);

  router.post("/forgot-password", ctrl.forgotPassword);
  router.post("/reset-password", ctrl.resetPassword);

  router.post("/login", ctrl.loginUser);

  router.post("/verify-otp", ctrl.verifyOTP);

  // Verify face
  router.post("/verify-face", ctrl.verifyFace);

  // Wallet
  router.get("/wallet", verify, ctrl.getWallet);

  // ===== Sign In With Pehchaan =====

  router.get("/authorize", verify, ctrl.startAuthorization);

  router.post("/authorize/approve", verify, ctrl.approveAuthorization);

  router.get("/authorize/profile", verify, ctrl.getAuthorizedProfile);

  router.get("/profile", verify, ctrl.getProfile);

  router.post("/profile", verify, ctrl.saveProfile);

  module.exports = router;
