const db = require('../db/index');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
  instructor:{
    type: mongoose.Schema.Types.String,
    ref:'Instructor',
  }
});

const instructorSchema = new mongoose.Schema({
  name: String,
  username: {
  type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  specialization:String,
})

const Admin =  mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = {
  Admin,
  User,
  Instructor,
  Course,
}