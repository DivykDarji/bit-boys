const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const ctrl = require("../controllers/dataController");

router.get("/me", verify, ctrl.getMyData);

module.exports = router;
