const mongoose = require("mongoose");

////🟢🟢////////🟢🟢////////🟢🟢////////🟢🟢////
const imageSchema = mongoose.Schema({
  public_id: {
    type: String,
    required: [true, "No Public Id Found of Product Image"],
    trim: true,
  },
  url: {
    type: String,
    required: [true, "No URL Found of Product Image"],
    trim: true,
  },
});
////🟢🟢////////🟢🟢////////🟢🟢////////🟢🟢////

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Add Product Description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please Add Product Price"],
      min: 0,
      max: 9999999,
    },

    image: imageSchema,

    quantity: {
      type: Number,
      required: [true, "Please Add Quantity"],
    },
    category: {
      type: String,
      required: [true, "Please Add Category"],
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    noOfReviews: {
      type: Number,
      default: 0,
    },
    ////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: [true, "No Name Exists of User"],
          trim: true,
        },
        rating: {
          type: Number,
          required: [true, "No Rating Exists of User"],
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
          required: [true, "No Comment Exists of User"],
          maxlength: 500,
          trim: true,
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: [true, "No Seller Found"],
    },
    ////🟠🟠////////🟠🟠////////🟠🟠////////🟠🟠////
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
