const zod = require("zod");

const reviewSchema = zod.object({
  name: zod.string(),
  ratings: zod.number(),
  comment: zod.string().max(500, "Comments cannot Exceed 500 Characters"),
});

const createProductSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  price: zod.number().max(9999999, "Maximum price is 9999999"),
  quantity: zod.number(),
  category: zod.string(),
  ratings: zod.number().optional(),
  noOfReviews: zod.number().optional(),
  reviews: zod.array(reviewSchema).optional(),
});

module.exports = {createProductSchema};
