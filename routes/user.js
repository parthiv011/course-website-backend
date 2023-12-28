const { Router } =  require('express');
const router  = Router();
const userMiddleware = require('../middlewares');

// user routes
router.post('/signup', (req, res) => {

})

router.get('/courses', (req, res) => {

})

router.post('/course/:courseId', userMiddleware, (req, res) => {

})

router.get('/purchasedCourses', userMiddleware, (req, res) => {

})

module.exports = router;