const passport = require('passport');

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login.ejs');
})


router.post('/login', passport.authenticate('local', {failureRedirect: "/login", successRedirect: "/welcome"}));
module.exports = router;