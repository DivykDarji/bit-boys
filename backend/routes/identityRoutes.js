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

module.exports = router;
