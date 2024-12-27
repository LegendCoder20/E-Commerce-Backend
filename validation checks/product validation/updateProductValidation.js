const zod = require("zod");

const reviewSchema = zod.object({
  name: zod.string(),
  ratings: zod.number(),
  comment: zod.string().max(500, "Comments cannot Exceed 500 Characters"),
});

const updateProductSchema = zod.object({
  name: zod.string().optional(),
  description: zod.string().optional(),
  price: zod.number().max(9999999, "Maximum price is 9999999").optional(),
  quantity: zod.number().optional(),
  category: zod.string().optional(),
  ratings: zod.number().optional(),
  noOfReviews: zod.number().optional(),
  reviews: zod.array(reviewSchema).optional(),
});

module.exports = {updateProductSchema};
