const router = require('express').Router();
const userModel = require('../models/userModel');
const signupController = require('../controllers/signup.controller')


router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', signupController)


module.exports = router