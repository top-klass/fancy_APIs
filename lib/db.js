const mysql = require('mysql');
const DB_option = require('../keys/db_option.js');

module.exports = mysql.createConnection(DB_option);
