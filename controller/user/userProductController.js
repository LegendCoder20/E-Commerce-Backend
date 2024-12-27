const asyncHandler = require("express-async-handler");

const Product = require("../../model/product model/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products: products,
    message: "Fetched All Products",
  });
});

const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "No Product Found of Specific Product ID",
    });
  }

  res.status(200).json({
    product: product,
    message: "Fetched The Specific Product",
  });
});

module.exports = {
  getAllProducts,
  getProductDetails,
};
