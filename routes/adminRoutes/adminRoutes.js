const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllSellers,
  getAdminProducts,
} = require("../../controller/admin/adminController");

router.post("/users", getAllUsers);
router.post("/sellers", getAllSellers);
router.post("/products", getAdminProducts);
// router.delete("/product/:id").get()

module.exports = router;
