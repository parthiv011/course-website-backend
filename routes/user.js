const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middlewares/user');
const { User, Course } = require('../db');
const { z } = require('zod');

// zod Validations for users
const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6)
})

// user routes
router.post('/signup', async (req, res) => {
  try {
    const {username, password} = userSchema.parse(req.body);

    await User.create({
      username,
      password,
    });
    res.json({
      msg: 'User created Successfully!',
    });
  } catch (e) {
    res.status(400).json({
      msg: 'Inputs are not correct!',
    });
  }
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
