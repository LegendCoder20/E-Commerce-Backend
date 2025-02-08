const asyncHandler = require("express-async-handler");

const Product = require("../../model/product model/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const totalProducts = await Product.countDocuments();
  const products = await Product.find()
    .populate("seller", "fullName")
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products: products,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    limit,
    message: "Fetched All Products",
  });
});

const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "fullName"
  );

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
