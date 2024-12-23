const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add your Name"],
    },
    phone: {
      type: String,
      required: [true, "Please Add your Phone Number"],
    },
    email: {
      type: String,
      required: [true, "Please Add your Email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please Add your Password"],
      minlength: [6, "Password Must be Atleast 6 Characters Long"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
