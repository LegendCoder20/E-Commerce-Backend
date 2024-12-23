const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../model/user model/userModel");
const {
  registerSchema,
  loginSchema,
} = require("../../validation checks/user/userValidation");

// Check User Validation Function //
const validation = (checkUserValidaton) => {
  if (!checkUserValidaton.success) {
    throw new Error(
      `Validation Error: ${checkUserValidaton.error.errors
        .map((e) => e.message)
        .join("🟠🟠")}`
    );
  }
};

// Generate Token //
const generateToken = (id) => {
  try {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (err) {
    console.log("Some Error Occured while Generating Token = ", err);
    throw new Error("Token Generation Failed");
  }
};

//////////////////////////////////////////

// Register User || Create New Account //
const registerUser = asyncHandler(async (req, res) => {
  const {name, phone, email, password} = req.body;

  const checkUserRegisterValidation = registerSchema.safeParse(req.body);
  validation(checkUserRegisterValidation);

  if (!name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please Add all Fields");
  }

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    phone,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("User Registration Failed due to Server Error");
  }
});

/////////////////////////////////////////////////

// Login User || Log in Into Existing Account //
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const checkUserLoginValidation = loginSchema.safeParse(req.body);
  validation(checkUserLoginValidation);

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Add All Fields");
  }

  const user = await User.findOne({email});

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

///////////////////////////////////////////////////////

// Get User || Get Existing User Data to Auto Login //
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
