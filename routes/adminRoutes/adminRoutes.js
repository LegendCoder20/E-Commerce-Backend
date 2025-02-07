const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllSellers,
  getAdminProducts,
} = require("../../controller/admin/adminController");

router.get("/users", getAllUsers);
router.get("/sellers", getAllSellers);
router.get("/products", getAdminProducts);
// router.delete("/product/:id").get()

module.exports = router;
