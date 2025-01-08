const express = require("express");
const router = express.Router();
const User = require("../../model/user model/userModel");
const {
  getAllProducts,
  addProduct,
  deleteProduct,
} = require("../../controller/user/cartController");

const {
  getProductDetails,
} = require("../../controller/user/userProductController");

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

router.get("/", protect(User, "user"), getAllProducts);
router.post("/add", protect(User, "user"), addProduct);
router.delete("/remove/:product_id", protect(User, "user"), deleteProduct);

// For Getting the Product Detail When user Click on Specific Product from his Cart for Product Detail // You navigate him to /auth/product/:id   how?( by requesting this endpoint from front end  (no need to write it here again and again)  )

module.exports = router;
