const { z } = require('zod');

// validations for adding course from admin side
const addCoursesSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  price: z.number(),
  instructor: z.string(),
});

// validations for adding course from instructor side
const instructorAddCourseSchema = z.object({
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

module.exports = { userSignupSchema , addCoursesSchema, instructorAddCourseSchema};