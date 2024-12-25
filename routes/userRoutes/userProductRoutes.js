const express = require("express");
const router = express.Router();

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

const {
  getAllProducts,
  getProductDetails,
} = require("../../controller/user/userProductController");

//🟡🟡🟡🟡// -> NO AUTH <- //
router.get("/", getAllProducts); // Get All Products (No login required)
router.get("/product/:id", getProductDetails); // Get Only the Product of Specific ID (No login required)
//🟡🟡🟡🟡//

//🟠🟠🟠🟠// -> AUTH <- //
router.get("/auth/products", protect, getAllProducts); // Get All Products for Authenticated User
router.get("/auth/product/:id", protect, getProductDetails); // Get Product Details for Authenticated User
//🟠🟠🟠🟠//

module.exports = router;
