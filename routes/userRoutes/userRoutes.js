const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../../controller/user/userController");

const User = require("../../model/user model/userModel");

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

// Register A New User
router.post("/register", registerUser);

// Log In Existing User
router.post("/login", loginUser);

// Get Users Detail
router.get("/getuser", protect(User, "user"), getUser);

module.exports = router;
