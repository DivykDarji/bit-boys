const router = require("express").Router();
const ctrl = require("../controllers/consentController");

router.post("/request", ctrl.requestConsent);
router.post("/approve", ctrl.approveConsent);
router.post("/revoke", ctrl.revokeConsent);

module.exports = router;
