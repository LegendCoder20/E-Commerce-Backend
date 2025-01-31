const asyncHandler = require("express-async-handler");
const User = require("../../model/user model/userModel");
const Seller = require("../../model/seller model/sellerModel");
const Product = require("../../model/product model/productModel");
const Cart = require("../../model/cart model/cartModel");

////🟠🟠////////🟠🟠 GET ALL PRODUCT 🟠🟠////////🟠🟠////
const getAllProducts = asyncHandler(async (req, res) => {
  if (!req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const cartProducts = await Cart.find({user: req.user.id}).populate(
    "products.product_id"
  );
  if (cartProducts.length > 0) {
    res.status(200).json({
      cartProducts,
      message: "Fetched All Products from User's Cart",
    });
  } else {
    res.status(200).json({
      message: "User's Cart is Empty.",
    });
  }
});
////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////

////🟡🟡////////🟡🟡ADD PRODUCT🟡🟡////////🟡🟡////
const addProduct = asyncHandler(async (req, res) => {
  const {product_id, quantity} = req.body;

  if (!product_id || !quantity) {
    res.status(400);
    throw new Error("No Product or Quantity Found");
  }

  const product = await Product.findById(product_id).populate("seller");
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  let cart = await Cart.findOne({user: req.user});

  if (cart) {
    const existingProductIndex = cart.products.findIndex(
      (p) => p.product_id.toString() === product_id
    );

    if (existingProductIndex !== -1) {
      return res.status(200).json({
        message: "Item already exists in the cart.",
      });
    } else {
      cart.products.push({
        product_id: product.id,
        quantity,
      });
    }
  } else {
    cart = new Cart({
      user: req.user.id,
      seller: product.seller.id,
      products: [
        {
          product_id: product.id,
          quantity,
        },
      ],
    });
  }

  await cart.save();
  res.status(200).json({
    message: "Product Added to Cart Successfully",
  });
});
////🟡🟡////////🟡🟡////////🟡🟡////////🟡🟡////

////🟠🟠////////🟠🟠 DELETE PRODUCT 🟠🟠////////🟠🟠////
const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const cart = await Cart.findOne({user: req.user.id});

  if (!cart) {
    return res.status(404).json({
      message: "Cart Not Found",
    });
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product_id.toString() === req.params.product_id
  );

  if (productIndex === -1) {
    return res.status(404).json({message: "Product Not Found in Cart"});
  }

  cart.products.splice(productIndex, 1);

  await cart.save();

  res.status(200).json({
    message: "Product Removed From the Cart",
  });
});
////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////

module.exports = {getAllProducts, addProduct, deleteProduct};
