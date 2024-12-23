const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../../controller/user/userController");

const {
  protect,
} = require("../../middleware/user middleware/userAuthMiddleware");

// Register A New User
router.post("/register", registerUser);

// Log In Existing User
router.post("/login", loginUser);

// Get Users Detail
router.get("/getuser", protect, getUser);

module.exports = router;
