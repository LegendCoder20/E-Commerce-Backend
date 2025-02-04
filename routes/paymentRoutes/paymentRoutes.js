const express = require("express");
const router = express.Router();
const {
  checkout,
  verifyPayment,
} = require("../../controller/payment/paymentController");

router.post("/checkout", checkout);
router.post("/verification", verifyPayment);
module.exports = router;
