require('dotenv').config();

const mysql = require('mysql2/promise');

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB,
} = process.env;

module.exports = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
    connectTimeout: 5000,
    connectionLimit: 30 //default 10
})