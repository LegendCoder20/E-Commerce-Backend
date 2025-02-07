const express = require("express");
const router = express.Router();
const {
  checkout,
  verifyPayment,
} = require("../../controller/payment/paymentController");
const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");
const User = require("../../model/user model/userModel");

router.post("/checkout", protect(User, "user"), checkout);
router.post("/verification", verifyPayment);
module.exports = router;
