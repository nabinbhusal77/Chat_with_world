
class UserModel {

    // Connection from DB
    connection = require('../config/db.config');

    // Insert User into DB
    insertUser(user) {

        return new Promise((res, rej) => {

            // SQL statement
            let sql = "INSERT INTO user SET ?";

            this.connection.query(sql, user, (err, result) => {

                if (err) rej(err);
                return res(err);
            })
        })
    }

    //Get User with matching userId

    getUserWithId(userId) {

        return new Promise((res, rej) => {
            // SQL Statment
            let sql = `SELECT * FROM user WHERE user_id="${userId}"`;

            this.connection.query(sql, (err, result) => {

                if (err) return rej(err);
                return res(result);
            })
        })

    }


    //Get User with matching EMAIL
    getUserWithEmail(email) {

        return new Promise((res, rej) => {
            // SQL Statment
            let sql = `SELECT * FROM user WHERE email="${email}"`;

            this.connection.query(sql, (err, result) => {

                if (err) return rej(err);
                return res(result);
            })
        })

    }

    //Get User with matching EMAIL AND PASSWORD
    getUserWithEmailPass(user) {

        return new Promise((res, rej) => {
            // SQL Statment
            let sql = `SELECT * FROM user WHERE email="${user.email}" && password="${user.password}"`;

            this.connection.query(sql, (err, result) => {

                if (err) return rej(err);
                return res(result);
            })
        })

    }

}

module.exports = new UserModel();