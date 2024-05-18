const conn = require("../config/connection");
const bcrypt = require('bcrypt');

class User {
  constructor(userID, fullname, username, email, contact, password) {
    this.user_id = userID;
    this.fname = fullname;
    this.uname = username;
    this.em = email;
    this.con = contact;
    this.pass = password;
  }

  async register() {
    try {
      const [rows, fields] = await conn.execute("INSERT INTO `register`(`fullname`, `username`, `email`, `contact_no`, `password`) VALUES (?, ?, ?, ?, ?)", [this.fname, this.uname, this.em, this.con, this.pass]);
      console.log("Account created successfully");
      return true;
    } catch (error) {
      console.error("Error account is not created", error.message);
      throw error;
    }
  }

  async login() {
    try {
      const [rows, fields] = await conn.execute("SELECT * FROM register WHERE username = ?", [this.uname]);

      if (rows.length === 0) {
        return { queryResult: null, authenticationResult: false };
      }

      const userData = rows[0];
      const isValid = await bcrypt.compare(this.pass, userData.password);
      return { queryResult: userData, authenticationResult: isValid };
    } catch (error) {
      console.error("Error querying database:", error);
      throw error;
    }
  }
}

module.exports = User;
