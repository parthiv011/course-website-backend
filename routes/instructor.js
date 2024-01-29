const { Router } = require('express');
const { signUp, signIn, postCourses, showCourses } = require('../controllers/instructor');
const instructorMiddleware = require('../middlewares/instructor');
const router = Router();


router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/courses', instructorMiddleware ,showCourses );

router.post('/courses', instructorMiddleware ,postCourses);

// live class url

module.exports = router;