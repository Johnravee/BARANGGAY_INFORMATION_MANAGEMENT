const conn = require("../config/connection");

class Papabarangay {
      constructor(userID, name, address, birthday, placeofbirth, precint, contactno, gender, status, purpose, height, weight, nameofparents, guardianaddress, parentscontactno, rs, imagedata) {
    this.userID = userID;
    this.name = name;
    this.address = address;
    this.birthday = birthday;
    this.placeofbirth = placeofbirth;
    this.precint = precint;
    this.contactno = contactno;
    this.gender = gender;
    this.status = status;
    this.purpose = purpose;
    this.height = height;
    this.weight = weight;
    this.nameofparents = nameofparents;
    this.guardianaddress = guardianaddress;
    this.parentscontactno = parentscontactno;
    this.rs = rs;
    this.imagedata = imagedata;


console.log("userID:", this.userID);
console.log("Name:", this.name); 
console.log("Address:", this.address); 
console.log("Birthday:", this.birthday);
console.log("Place of Birth:", this.placeofbirth); 
console.log("Precint:", this.precint); 
console.log("Contact No:", this.contactno);
console.log("Gender:", this.gender); 
console.log("Status:", this.status);
console.log("Purpose:", this.purpose); 
console.log("Height:", this.height); 
console.log("Weight:", this.weight); 
console.log("Name of Parents:", this.nameofparents); 
console.log("Guardian Address:", this.guardianaddress); 
console.log("Parents Contact No:", this.parentscontactno); 
console.log("Residence Since:", this.rs); 
console.log("Image Data:", this.imagedata); 

  }

  async save() {
    try {
      const query = `
        INSERT INTO id
        (user_registered_id, Name, Address, birthday, place_of_birth, pricent_no, contact_no, gender, status, purpose, Height, Weight, Name_parents, ADDRESS2, Contact_no_Parents, Relationship, Upload_Valid_ID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [rows, fields] = await conn.execute(query, [
        this.userID,
        this.name,
        this.address,
        this.birthday,
        this.placeofbirth,
        this.precint,
        this.contactno,
        this.gender,
        this.status,
        this.purpose,
        this.height,
        this.weight,
        this.nameofparents,
        this.guardianaddress,
        this.parentscontactno,
        this.rs,
        this.imagedata
    ]);

      console.log("Data inserted successfully:", rows);
      return true;
    } catch (error) {
      console.error("Error inserting data:", error);
      return false;
    }
  }
}

module.exports = Papabarangay;
