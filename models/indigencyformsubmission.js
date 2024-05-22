const conn = require("../config/connection")


class Indigency {
    constructor(userID, fullname, address, yrofstay, purpose, patient, contactno, relationship, imageData) {
  this.userID = userID;
  this.fullname = fullname;
  this.address = address;
  this.yrofstay = yrofstay;
  this.purpose = purpose;
  this.patient = patient;
  this.contactno = contactno;
  this.relationship = relationship;
  this.imageData = imageData;

  console.log("userID:", this.userID);
console.log("fullname:", this.fullname);
console.log("address:", this.address);
console.log("yrofstay:", this.yrofstay);
console.log("purpose:", this.purpose);
console.log("patient:", this.patient);
console.log("contactno:", this.contactno);
console.log("relationship:", this.relationship);
console.log("imageData:", this.imageData);
}

async save() {
try {
  const query = `
    INSERT INTO indigency 
    (user_registered_id, Name, Address, Yearofstay, Purpose, nameofpatient, CN, RS, validID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [rows, fields] = await conn.execute(query, [
    this.userID,
    this.fullname,
    this.address,
    this.yrofstay,
    this.purpose,
    this.patient,
    this.contactno,
    this.relationship,
    this.imageData
  ]);

  console.log("Data inserted successfully :", rows)
  return true
} catch (error) {
  console.error("Error inserting data:", error)
  return false
}
}
}

module.exports = Indigency