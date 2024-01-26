const { Router } = require('express');
const { signUp, signIn } = require('../controllers/instructor');
const router = Router();


router.post('/signup', signUp);

router.post('/signin', signIn);

module.exports = router;