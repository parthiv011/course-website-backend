const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cbing2111:cbing1234@cluster0.lnqzwby.mongodb.net/course_selling_app');

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String, 
    imageLink: String,
    price: Number
});

const Admin =  mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    Admin, 
    User, 
    Course
}