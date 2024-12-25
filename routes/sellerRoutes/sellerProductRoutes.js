const express = require("express");
const router = express.Router();

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getProductDetails,
} = require("../../controller/seller/sellerProductController");

//🟠🟠🟠🟠// -> AUTH <- //
router.get("/auth/products", protect, getSellerProducts); // Fetch products for the authenticated seller
//🟠🟠🟠🟠

//🟡🟡🟡🟡// -> AUTH <- //
router.post("/create", protect, createProduct);
//🟡🟡🟡🟡

//🟠🟠🟠🟠// -> AUTH <- //
router.route("/update/:id").put(protect, updateProduct);
//🟠🟠🟠🟠

//🟡🟡🟡🟡// -> AUTH <- //
router
  .route("/:id")
  .delete(protect, deleteProduct)
  .get(protect, getProductDetails); // Get the Product Details (Authenticated Seller Only)
//🟡🟡🟡🟡

module.exports = router;
