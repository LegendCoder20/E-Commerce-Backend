const asyncHandler = require("express-async-handler");
const Product = require("../../model/product model/productModel");
const {
  createProductSchema,
} = require("../../validation checks/product validation/createProductValidation");
const {
  updateProductSchema,
} = require("../../validation checks/product validation/updateProductValidation");

const dataUri = require("../../utils/dataUri");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration //
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Check Product Validation Function //
const validation = (checkUserValidaton) => {
  if (!checkUserValidaton.success) {
    throw new Error(
      `Validation Error: ${checkUserValidaton.error.errors
        .map((e) => e.message)
        .join("🟠🟠")}`
    );
  }
};

////🟠🟠////////🟠🟠 CREATE PRODUCT 🟠🟠////////🟠🟠////
const createProduct = asyncHandler(async (req, res) => {
  const {name, description, price, quantity, category} = req.body;
  const image = req.file;

  if (!name || !description || !price || !quantity || !category || !image) {
    res.status(400);
    throw new Error("Please Add All Fields");
  }

  const parsedPrice = parseInt(price);
  const parsedQuantity = parseInt(quantity);

  const validatedData = {
    ...req.body,
    price: parsedPrice,
    quantity: parsedQuantity,
  };

  const checkProductValidation = createProductSchema.safeParse(validatedData);
  validation(checkProductValidation);

  const fileUri = dataUri(image);

  let myCloud;
  try {
    myCloud = await cloudinary.uploader.upload(fileUri.content); // It will return public_id and secrue_url
  } catch (err) {
    throw new Error("Cloudinary Upload Fail");
  }

  if (!req.seller) {
    throw new Error("Not Authorized");
  }
  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    category,
    seller: req.seller.id,
  });

  if (product) {
    res.status(201).json({
      product: product,
      message: "Product Created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Input Data");
  }
});
////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////

////🟡🟡////////🟡🟡////////🟡🟡////////🟡🟡////
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No Product Found");
  }

  if (!req.seller || product.seller.toString() !== req.seller.id) {
    res.status(400);
    throw new Error("Seller Not Authorized");
  }

  const {name, description, price, quantity, category} = req.body;
  const image = req.file;

  let parsedPrice = undefined;
  let parsedQuantity = undefined;

  if (price) {
    parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({message: "Price must be a valid number."});
    }
  }

  if (quantity) {
    parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity)) {
      return res
        .status(400)
        .json({message: "Quantity must be a valid number."});
    }
  }

  const validatedData = {
    ...req.body,
    price: parsedPrice,
    quantity: parsedQuantity,
  };

  console.log(validatedData);

  if (name || description || price || quantity || category || image) {
    const checkProductValidation = updateProductSchema.safeParse(validatedData);
    validation(checkProductValidation);
  }

  let myCloud = product.image;
  if (image) {
    const fileUri = dataUri(image);
    try {
      myCloud = await cloudinary.uploader.upload(fileUri.content);
    } catch (err) {
      throw new Error("Cloudinary Upload Fail");
    }
  }

  const updatedProductDetails = {
    ...(name && {name}),
    ...(description && {description}),
    ...(price && {price}),
    ...(quantity && {quantity}),
    ...(category && {category}),
    ...(image && {
      image: {public_id: myCloud.public_id, url: myCloud.secure_url},
    }),
    seller: req.seller.id,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updatedProductDetails,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (updatedProduct) {
    res.status(200).json({
      product: updatedProduct,
      message: "Product Updated",
    });
  } else {
    throw new Error("Failed to Update Product");
  }
});
////🟡🟡////////🟡🟡////////🟡🟡////////🟡🟡////

////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    res.status(400);
    throw new Error("No Product Found Of Such ID");
  }

  if (!req.seller) {
    res.status(400);
    throw new Error("Seller Not Found");
  }
  if (product.seller.toString() !== req.seller.id) {
    res.status(401);
    throw new Error("UnAthorized to Delete this Product");
  }

  try {
    await cloudinary.uploader.destroy(product.image.public_id);
    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    res.status(400);
    throw new Error("Some Problem Occured while Deleting Product");
  }
});
////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////

////🟡🟡////////🟡🟡////////🟡🟡////////🟡🟡////
const getSellerProducts = asyncHandler(async (req, res) => {
  const seller = req.seller.id;
  const products = await Product.find({seller: seller});
  res.status(200).json({
    products: products,
    message: "All Products of the Seller Fetched",
  });
});
////🟡🟡////////🟡🟡////////🟡🟡////////🟡🟡////

////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    product: product,
  });
});
////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getProductDetails,
};
