const router = require('express').Router();
const userModel = require('../models/userModel');
const signupController = require('../controllers/signup.controller');
const passport = require('passport');

// Home Page

router.get('/', (req, res) => {
    res.render('index.ejs')
})

// Register Route Handling

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', signupController)



// Login Route Handling

router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.post('/login', passport.authenticate('local', 
{
    failureRedirect: "/login", 
    successRedirect: "/welcome", 
    failureFlash: true
}));



// Welcome Page

router.get('/welcome', (req, res) => {
    if(req.isAuthenticated()) { 
        res.render('welcome.ejs');
    } else {
        res.send("You are not authorized to this route.")
    }

    
})

module.exports = router