const express = require("express");
const router = express.Router();

const {
  registerSeller,
  loginSeller,
  getSeller,
} = require("../../controller/seller/sellerController");

const Seller = require("../../model/seller model/sellerModel");

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

// Register A New Seller
router.post("/register", registerSeller);

// Login in Existing Seller
router.post("/login", loginSeller);

// Get Sellers Detail
router.get("/getseller", protect(Seller, "seller"), getSeller);

module.exports = router;
