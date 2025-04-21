// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check", authController.checkSession);

module.exports = router;
