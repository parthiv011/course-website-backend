const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middlewares/user');
const { User, Course } = require('../db');

// user routes
router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username,
    password,
  });
  res.json({
    msg: 'User created Successfully!',
  });
});

router.get('/courses', async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: 'Purchase complete!',
  });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  console.log(user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;
