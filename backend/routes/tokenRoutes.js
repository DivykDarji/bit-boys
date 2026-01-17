const router = require("express").Router();
const ctrl = require("../controllers/tokenController");

router.post("/issue", ctrl.issueToken);

module.exports = router;
