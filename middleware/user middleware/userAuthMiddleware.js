const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/user model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token , Not Authorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach the user object to the request for further use
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Token is Not Valid");
  }
});

module.exports = {protect};
