const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Add your Name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please Add your Phone No"],
      trim: true,
    },
    businessEmail: {
      type: String,
      required: [true, "Please Add your Bussiness Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shopName: {
      type: String,
      required: [true, "Please Add Shop Name"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please Add Address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Add Password"],
      minlength: [6, "Password Must be Atleast 6 Characters Long"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
