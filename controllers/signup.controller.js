const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');


let authenticateNewUser = async (req, res) => {
    let user = {
        user_id: Date.now().toString(),
        name: req.body.name.trim(),
        email: req.body.email,
        password: req.body.password,
    }

        // Checking if user already with email from DB.
    let userAleadyExist = false;

    try {
        let emailInDb = await userModel.getUserWithEmail(user.email);
        if(emailInDb.length > 0) {
            userAleadyExist = true
        }
    } catch (error) {
        throw error
    }
    

    
    // ********************************** Verify New User With Various Checks ***************************************** //

    let error = "";
    let regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // **** 1. Check if fields are empty ****

    if (user.name === "" || user.email === "" || user.password === "") {

        error = "Fill in all the fields";


        // **** 2. Check if length of NAME is less than 3.

    } else if (user.name.length < 3) {

        error = "Name must be of 3 characters or more";


        // **** 3. Check if format of EMAIL is correct.

    } else if (!regExEmail.test(user.email)) {

        error = "Enter a valid email address.";


        // **** 4. Check if user already exist with given email.

    } else if (userAleadyExist) {

        error = "Email already taken.";


        // **** 5. Check if length of PASSWORD is less than 8

    } else if (user.password.length < 8) {

        error = "Password must be of 8 characters or more"


        // **** 6. Password doesn't match.

    } else if (user.password !== req.body.rePassword) {
        error = "Password doesn't match."
    }


    // If any error exist then return error.
    if (error) {
        res.render('register.ejs', 
        { user: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            rePassword: req.body.rePassword,
        },

        error: error
        })


        // Lastly Insert User By Hashing Pwd

    } else {
        
        bcrypt.hash(user.password, 10)
            .then(hashedPwd => {

                user.password = hashedPwd

                userModel.insertUser(user)
                    .then(result => {
                        res.redirect('/login');
                    })
                    .catch(err => {
                        console.log("Error Inserting User: " + err);
                        res.redirect('/register');
            })
            })
        
    }


}

module.exports = authenticateNewUser;