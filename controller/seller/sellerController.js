const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Seller = require("../../model/seller model/sellerModel");
const {
  registerSchema,
  loginSchema,
} = require("../../validation checks/seller validation/sellerValidation");

// Check User Validation Function //
const validation = (checkSellerValidaton) => {
  if (!checkSellerValidaton.success) {
    throw new Error(
      `Validation Error: ${checkSellerValidaton.error.errors
        .map((e) => e.message)
        .join("🟠🟠")}`
    );
  }
};

// Generate Token //
const generateToken = (id) => {
  try {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
  } catch (err) {
    console.log("Some Error Occured while Generating Token = ", err);
    throw new Error("Token Generation Failed");
  }
};

//////////////////////

// Register Seller //
const registerSeller = asyncHandler(async (req, res) => {
  const {fullName, phone, businessEmail, shopName, address, password} =
    req.body;

  const checkSellerRegisterValidation = registerSchema.safeParse(req.body);
  validation(checkSellerRegisterValidation);

  if (
    !fullName ||
    !phone ||
    !businessEmail ||
    !shopName ||
    !address ||
    !password
  ) {
    res.status(400);
    throw new Error("Please Add all Fields");
  }

  const sellerExists = await Seller.findOne({businessEmail});
  if (sellerExists) {
    res.status(400);
    throw new Error("Seller Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const seller = await Seller.create({
    fullName,
    phone,
    businessEmail,
    shopName,
    address,
    password: hashedPassword,
  });

  if (seller) {
    res.status(201).json({
      _id: seller._id,
      fullName: seller.fullName,
      phone: seller.phone,
      businessEmail: seller.businessEmail,
      shopName: seller.shopName,
      address: seller.address,
      token: generateToken(seller._id),
    });
  } else {
    res.status(500);
    throw new Error("Invalid Credentials");
  }
});

//////////////////////

// Login Seller //
const loginSeller = asyncHandler(async (req, res) => {
  const {businessEmail, password} = req.body;

  const checkSellerLoginValidation = loginSchema.safeParse(req.body);
  validation(checkSellerLoginValidation);

  if (!businessEmail || !password) {
    res.status(400);
    throw new Error("Please Add all Fields");
  }

  const seller = await Seller.findOne({businessEmail});
  if (!seller || !(await bcrypt.compare(password, seller.password))) {
    res.status(500);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json({
    _id: seller._id,
    fullName: seller.fullName,
    phone: seller.phone,
    businessEmail: seller.businessEmail,
    shopName: seller.shopName,
    address: seller.address,
    token: generateToken(seller._id),
  });
});

//////////////////////

// Get Seller //
const getSeller = asyncHandler(async (req, res) => {
  res.status(200).json({
    seller: req.seller,
  });
});

module.exports = {
  registerSeller,
  loginSeller,
  getSeller,
};
