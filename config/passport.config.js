const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// User Model
const userModel = require('../models/userModel');


// Custom username and password (***name*** attribute in html)
const customField = {
    usernameField: "email",
    passwordField: "password",
}


const verfiyCallBack = (username, password, done) => {
    
    // Check if provided email in Db

    userModel.getUserWithEmail(username)
        .then(user => {
            
            if(user.length === 0) return done(null, false, {message: "User does not exist."});


            // Compare password with hashed from DB

            bcrypt.compare(password, user[0].password)
                .then(result => {
                    if (!result) return done(null, false, {message: "Password does not match."});

                    return done(null, user)
                })
                .catch(err => {
                    done(err)
                })

            
        })
        .catch(err => {
            done(err)
        })
}

passport.use(new LocalStrategy(customField, verfiyCallBack))


// Store userId In Session After Login

passport.serializeUser((user, done) => {
    done(null, user[0].user_id);
})


passport.deserializeUser((userId, done) => {

    // Get User with matching userId 
    userModel.getUserWithId(userId)
        .then(user => {
            done(null, user[0])
        })
        .catch(err => {
            done(err)
        })
})