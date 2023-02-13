const mysql = require('mysql2')

const connection = mysql.createConnection();

module.exports = connection;