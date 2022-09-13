// Setting up Express

const express = require('express'),
app = express();


// Dependencies (Modules)

const session = require('express-session');
const passport = require('passport')


// MySQLStore Config

const sessionStore = require('./config/mysql-session.config')


// Set View Engine (EJS)

app.set('view-engine', 'ejs');


// Static Files

app.use(express.static('public'))


// Express Body Praser

app.use(express.urlencoded({extended: false}))


// Express-Session

app.use(session({
	key: 'session_id',
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// Initializing the passport 

require('./config/passport.config');   
app.use(passport.initialize());
app.use(passport.session());


// Import Routes

const routes = require('./routes/index')


// Use Routes

app.use(routes)


module.exports = app