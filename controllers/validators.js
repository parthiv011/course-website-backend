const { z } = require('zod');
const addCoursesSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  price: z.number(),
});

// zod Validations for users Sign up
const userSignupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

module.exports = { userSignupSchema , addCoursesSchema};