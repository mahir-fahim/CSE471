// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
<<<<<<< HEAD

=======
router.get("/check", authController.checkSession);
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91

module.exports = router;
