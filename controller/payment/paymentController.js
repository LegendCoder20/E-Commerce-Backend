const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const checkout = asyncHandler(async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "order_rcptid_" + Date.now(),
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    order: order,
    message: "Order Created",
  });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthenticate = expectedSignature === razorpay_signature;

  if (isAuthenticate) {
    res.redirect(
      `http://localhost:5000/users/paymentSuccess?reference=${razorpay_payment_id}`
    );
    res.status(200).json({
      message: "Payment Successful",
    });
  } else {
    res.redirect(`http://localhost:5000/paymentFailed`);
    res.status(200).json({
      message: "Payment Failed",
    });
  }
});

module.exports = {
  checkout,
  verifyPayment,
};
