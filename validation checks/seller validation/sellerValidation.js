const zod = require("zod");

const registerSchema = zod.object({
  fullName: zod.string().nonempty("Name is Required"),
  phone: zod.string(),
  businessEmail: zod.string().email(),
  shopName: zod.string().nonempty("Shop Name is Required"),
  address: zod.string(),
  password: zod
    .string()
    .min(6, "Password must be 6 Characters Long")
    .regex(
      /(?=.*[!@#$%^&*])/,
      "Password must include at least one special character"
    )
    .regex(/(?=.*\d)/, "Password must include at least one number")
    .regex(
      /(?=.*[A-Z])/,
      "Password must include at least one uppercase letter"
    ),
});

const loginSchema = zod.object({
  businessEmail: zod.string().email(),
  password: zod.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
