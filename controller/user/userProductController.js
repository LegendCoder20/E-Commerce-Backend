const asyncHandler = require("express-async-handler");

const Product = require("../../model/product model/productModel");

const getAllProducts = asyncHandler(async (req, res) => {});

const getProductDetails = asyncHandler(async (req, res) => {});

module.exports = {
  getAllProducts,
  getProductDetails,
};
