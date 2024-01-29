const { z } = require('zod');
const { Admin, Course, User, Instructor } = require('../models/models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { userSignupSchema, addCoursesSchema } = require('./validators');

const signUp = async (req, res) => {
  try {
    const { username, password } = userSignupSchema.parse(req.body);
    const admin = await Admin.findOne({username});

    if(admin){
      return res.status(409).json({
        msg: "Admin already exists!"
      });
    }
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
  const { username, password } = userSignupSchema.parse(req.body);
  try {
    const admin = await Admin.findOne({
      username,
      password,
    });
    if (admin) {
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
        msg: 'Invalid Credentials for Admin!',
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
    const { title, description, imageLink, price, instructor } = addCoursesSchema.parse(
      req.body
    );

    const addCourse = await Course.create({
      title,
      description,
      imageLink,
      price,
      instructor,
    });
    res.json({
      msg: 'Course added Successfully!',
      courseId: addCourse._id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "Failed to add course!"
    })
  }
};

const showCourses = async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
};

const allUserData = async (req, res) => {
  try {
    const allUsers = await User.find({});
    const allInstructors = await Instructor.find({});

    res.status(200).json({
      users: allUsers,
      instructors: allInstructors
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "Internal Server Error!"
    })
  }
}

module.exports = {
  signUp,
  signIn,
  postCourses,
  showCourses,
  allUserData
}