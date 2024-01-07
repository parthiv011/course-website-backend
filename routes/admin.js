const { Router } = require('express');
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require('../db');
const router = Router();
const { z } = require('zod');

// zod Validations
const adminSignupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const addCoursesSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  price: z.number(),
});

//admin routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = adminSignupSchema.parse(req.body);

    await Admin.create({
      username: username,
      password: password,
    });
    res.json({
      msg: 'Admin Created Successfully',
    });
  } catch (e) {
    res.status(400).json({
      msg: 'Inputs are not correct!',
    });
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = addCoursesSchema.parse(
      req.body
    );

    const addCourse = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    res.json({
      msg: 'Course added Successfully!',
      courseId: addCourse._id,
    });
  } catch (e) {
    res.status(400).json({
      msg: 'Course Schema not matched!',
    });
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
});

module.exports = router;
