const zod = require("zod");

// Register Validation
const registerSchema = zod.object({
  name: zod.string().nonempty("Name is Required"),
  phone: zod.string(),
  email: zod.string().email(),
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

// Login Validation
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
