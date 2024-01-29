const { z } = require('zod');
const { User, Course } = require('../models/models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { userSignupSchema } = require('./validators');

const signUp = async (req, res) => {
  try {
    const { username, password } = userSignupSchema.parse(req.body);

    const user = await User.findOne({username});
    if(user) {
      return res.status(409).json({
        msg:"User already exists!"
      });
    }

    await User.create({
      username,
      password,
    });

    res.status(200).json({
        msg: 'User created Successfully!',
    });
  } catch (e) {
    res.status(400).json({
      msg: 'Inputs are not correct!',
    });
  }
};

const signIn = async (req, res) => {
  const { username, password } = userSignupSchema.parse(req.body);
  try {
    const user = await User.findOne({
      username,
      password,
    });
    if (user) {
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
        msg: 'User Doesnt Exists!',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Internal Server Error!',
    });
  }
};

const showCourses = async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
};

const purchaseCourse = async (req, res) => {
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
};

const showPurchasedCourses = async (req, res) => {
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
};

const userDashboard = async (req, res) => {
  try
  {
    const userData = await User.findOne({ username: req.headers.username });
    res.json({
      userData
    });
  }
  catch (e){
    console.error(e);
    res.status(500).json({
      msg: "Internal Server Error!"
    })
  }
}

module.exports = {
  signUp,
  signIn,
  showCourses,
  purchaseCourse,
  showPurchasedCourses,
  userDashboard
}