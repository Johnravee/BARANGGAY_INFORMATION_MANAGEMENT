const conn = require("../config/connection")


class Cedula {
    constructor(userID, fullname, address, birthdate, birthplace, citizenship, civilstatus, idtype, idnum, height, weight, gender, occupation, imageData) {
  this.userID = userID;
  this.fullname = fullname;
  this.address = address;
  this.birthdate = birthdate;
  this.birthplace = birthplace;
  this.citizenship = citizenship;
  this.civilstatus = civilstatus;
  this.idtype = idtype;
  this.idnum = idnum;
  this.height =height;
  this.weight = weight;
  this.gender = gender;
  this.occupation = occupation;
  this.imageData = imageData;

  console.log("userID:", this.userID);
console.log("fullname:", this.fullname);
console.log("address:", this.address);
console.log("birthdate:", this.birthdate);
console.log("birthplace:", this.birthplace);
console.log("citizenship:", this.citizenship);
console.log("civilStatus:", this.civilstatus);
console.log("idtype:", this.idtype);
console.log("idnum:", this.idnum);
console.log("height:", this.height);
console.log("weight:", this.weight);
console.log("gender:", this.gender);
console.log("occupation:", this.occupation);
console.log("imageData:", this.imageData);
}

async save() {
try {
  const query = `
    INSERT INTO cedula 
    (user_registered_id, name, Address, birthday, place_of_birth, citizenship, civil_status, id_type, id_number, HEIGHT, WEIGHT, gender, occupation, upload_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [rows, fields] = await conn.execute(query, [
    this.userID,
    this.fullname,
    this.address,
    this.birthdate,
    this.birthplace,
    this.citizenship,
    this.civilstatus,
    this.idtype,
    this.idnum,
    this.height,
    this.weight,
    this.gender,
    this.occupation,
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

module.exports = Cedula