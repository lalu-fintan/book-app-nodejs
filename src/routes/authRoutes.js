const express = require("express");
const { register, login } = require("../controller/authController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/info", verifyToken);

module.exports = router;
