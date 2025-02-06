const express = require("express");
const router = express.Router();

const {
  protect,
} = require("../../middleware/user seller middleware/authMiddleware");

const User = require("../../model/user model/userModel");

const {
  getAllProducts,
  getProductDetails,
} = require("../../controller/user/userProductController");

//🟡🟡🟡🟡// -> NO AUTH <- //
router.get("/", getAllProducts); // Get All Products (No login required)

router.get("/product/:id", getProductDetails); // Get Only the Product of Specific ID (No login required)
//🟡🟡🟡🟡//

//🟠🟠🟠🟠// -> AUTH <- //
router.get("/auth/products", protect(User, "user"), getAllProducts); // Get All Products for Authenticated User
router.get("/auth/product/:id", protect(User, "user"), getProductDetails); // Get Product Details for Authenticated User
//🟠🟠🟠🟠//

module.exports = router;
