
const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "brrs"
});

conn.getConnection((err) => {
    if (err) {
        console.log("Connection Error!", err);
    } else {
        console.log("Connected!");
    }
});

module.exports = conn