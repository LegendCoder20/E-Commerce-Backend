const express = require("express");
const router = express.Router();
const Seller = require("../../model/seller model/sellerModel");
const upload = require("../../middleware/image upload middleware/imageUploadMiddleware");

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
} = require("../../controller/seller/sellerProductController");

//🟠🟠🟠🟠// -> AUTH <- //
router.get("/auth/products", protect(Seller, "seller"), getSellerProducts); // Fetch products for the authenticated seller
//🟠🟠🟠🟠

//🟡🟡🟡🟡// -> AUTH <- //
router.post("/create", protect(Seller, "seller"), upload, createProduct);
//🟡🟡🟡🟡

//🟠🟠🟠🟠// -> AUTH <- //
router
  .route("/update/:id")
  .put(protect(Seller, "seller"), upload, updateProduct);
//🟠🟠🟠🟠

//🟡🟡🟡🟡// -> AUTH <- //
router
  .route("/:id")
  .delete(protect(Seller, "seller"), deleteProduct)
  .get(protect(Seller, "seller"), getSellerProducts); // Fetch products for the authenticated seller
//🟡🟡🟡🟡

router
  .route("/productDetails/:id")
  .get(protect(Seller, "seller"), getSellerProducts);

module.exports = router;
