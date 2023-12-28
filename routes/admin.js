const { Router } = require('express');
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require('../db');
const router = Router();

//admin routes
router.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    msg: 'Admin Created Successfully',
  });
});

router.post('/courses', adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const addCourse = await Course.create({
    title,
    description,
    imageLink,
    price
  })
  res.json({
    msg: "Course added Successfully!",
    courseId: addCourse._id
  })
});

router.get('/courses', adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses
  })
});

module.exports = router;
