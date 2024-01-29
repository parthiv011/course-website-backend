const { Router } = require('express');
const adminMiddleware = require('../middlewares/admin');

const { signIn, signUp, postCourses, showCourses, allUserData } = require('../controllers/admin');
const router = Router();

//admin routes
router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/courses', adminMiddleware, postCourses);

router.get('/courses', adminMiddleware, showCourses);

router.get('/dashboard', adminMiddleware, allUserData);

module.exports = router;
