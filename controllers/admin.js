const { z } = require('zod');
const { Admin, Course } = require('../models/models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

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

const signUp = async (req, res) => {
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
};

const signIn = async (req, res) => {
  const { username, password } = adminSignupSchema.parse(req.body);
  try {
    const user = await Admin.find({
      username,
      password,
    });
    if (user.length > 0) {
      const token = jwt.sign(
        {
          username,
        },
        secret
      );

      res.json({
        token,
      });
    } else {
      res.status(411).json({
        msg: 'Admin doesnt exists!',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

const postCourses = async (req, res) => {
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
};

const showCourses = async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
};

module.exports = {
  signUp,
  signIn,
  postCourses,
  showCourses
}