const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add your Name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please Add your Phone Number"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Add your Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Add your Password"],
      minlength: [6, "Password Must be Atleast 6 Characters Long"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
