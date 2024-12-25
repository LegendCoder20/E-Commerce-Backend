const asyncHandler = require("express-async-handler");
const Product = require("../../model/product model/productModel");

const createProduct = asyncHandler(async (req, res) => {});

const updateProduct = asyncHandler(async (req, res) => {});

const deleteProduct = asyncHandler(async (req, res) => {});

const getSellerProducts = asyncHandler(async (req, res) => {});

const getProductDetails = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getProductDetails,
};
