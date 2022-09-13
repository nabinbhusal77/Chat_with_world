const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const connection = require('./db.config');


const sessionStore = new MySQLStore({
    expiration: 86400000,
    charset: 'utf8mb4_bin',
    schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}

}, connection)

module.exports = sessionStore;