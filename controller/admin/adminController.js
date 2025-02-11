const asyncHandler = require("express-async-handler");

const User = require("../../model/user model/userModel");
const Seller = require("../../model/seller model/sellerModel");
const Product = require("../../model/product model/productModel");

const pass = process.env.PASSWORD;

const getAllUsers = asyncHandler(async (req, res) => {
  const password = req.body.password;
  if (pass === password) {
    const allUsers = await User.find().select(
      "_id name phone email createdAt updatedAt"
    );
    res.status(200).json({
      allUsers: allUsers,
      message: "All Users Fetched",
    });
  } else {
    res.status(400);
    throw new Error("Wrong Password");
  }
});

const getAllSellers = asyncHandler(async (req, res) => {
  const password = req.body.password;
  if (pass === password) {
    const allSeller = await Seller.find().select(
      "_id fullName phone businessEmail shopName address createdAt updatedAt"
    );
    res.status(200).json({
      allSellers: allSeller,
      message: "All Sellers Fetched",
    });
  } else {
    res.status(400);
    throw new Error("Wrong Password");
  }
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const password = req.body.password;
  if (pass === password) {
    const allProducts = await Product.find()
      .select("_id name price image category description createdAt updatedAt")
      .populate("seller", "fullName businessEmail");

    res.status(200).json({
      allProducts: allProducts,
      message: "All Products Fetched",
    });
  } else {
    res.status(400);
    throw new Error("Wrong Password");
  }
});

module.exports = {
  getAllUsers,
  getAllSellers,
  getAdminProducts,
};
