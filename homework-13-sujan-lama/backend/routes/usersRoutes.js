const express = require("express");
const { signup, login, verifyEmail } = require('../controllers/usersController');
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:email", verifyEmail);
module.exports = router;