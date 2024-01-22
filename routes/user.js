const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middlewares/user');
const { signUp, signIn, showCourses, purchaseCourse, showPurchasedCourses } = require('../controllers/user');

// user routes
router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/courses', showCourses);

router.post('/courses/:courseId', userMiddleware, purchaseCourse);

router.get('/purchasedCourses', userMiddleware, showPurchasedCourses);

module.exports = router;
