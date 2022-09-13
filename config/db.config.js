const mysql = require('mysql');

// Establishing Connection with DB

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})


connection.connect(err => {
    if (err) {
        console.log("Error Connecting: ", err.stack)
        return
    }

    console.log("Connected to db")
});


module.exports = connection;