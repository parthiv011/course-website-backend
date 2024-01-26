const { userSignupSchema } = require('./validators');
const { Instructor } = require('../models/models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const signUp = async (req, res) => {
  try {
    const { username, password } = userSignupSchema.parse(req.body);

    const instructor = await Instructor.findOne({username});

    if(instructor) {
      return res.status(409).json({
        msg: "Instructor already exists!"
      });
    }
    await Instructor.create({
      username,
      password
    });
    res.status(200).json({
      msg: "Instructor created successfully!"
    })
  } catch (e) {
    res.status(400).json({
      msg: "Inputs are not correct!"
    });
    console.log(e);
  }
}

const signIn = async (req, res) => {
  const { username, password } = (userSignupSchema).parse(req.body);
  try {
    const user = await Instructor.find({
      username,
      password
    });

    if(user) {
      const token = jwt.sign({
        username
      },
        secret
      );
      res.json({
        token
      });
    } else {
      res.status(411).json({
        msg: "Instructor doesnt exist!"
      });
    }
  }
  catch (e) {
    res.status(500).json({
      msg: "Internal server error!"
    });
    console.log(e);
  }
}

module.exports = {
  signUp,
  signIn
}