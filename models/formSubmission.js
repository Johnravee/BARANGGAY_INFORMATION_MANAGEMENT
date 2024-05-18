const conn = require("../config/connection")

//Form submission models
//dito lahay 'yung process ng pagiinsert ng data sa db
// inherit mo nalang 'yung class na Clearance

class Clearance {
        constructor(userID, date, fullname, gender, presentAddress, provincialAddress, organization, dateOfBirth, age, placeOfBirth, contactNo, civilStatus, residenceSince, percintNo, occupation, companyName, purposeOfClearance, imageData) {
    this.userID = userID;
    this.date = date;
    this.fullname = fullname;
    this.gender = gender;
    this.presentAddress = presentAddress;
    this.provincialAddress = provincialAddress;
    this.organization = organization;
    this.dateOfBirth = dateOfBirth;
    this.age = age;
    this.placeOfBirth = placeOfBirth;
    this.contactNo = contactNo;
    this.civilStatus = civilStatus;
    this.residenceSince = residenceSince;
    this.percintNo = percintNo;
    this.occupation = occupation;
    this.companyName = companyName;
    this.purposeOfClearance = purposeOfClearance;
    this.imageData = imageData;

    console.log("userID:", this.userID);
console.log("date:", this.date);
console.log("fullname:", this.fullname);
console.log("gender:", this.gender);
console.log("presentAddress:", this.presentAddress);
console.log("provincialAddress:", this.provincialAddress);
console.log("organization:", this.organization);
console.log("dateOfBirth:", this.dateOfBirth);
console.log("age:", this.age);
console.log("placeOfBirth:", this.placeOfBirth);
console.log("contactNo:", this.contactNo);
console.log("civilStatus:", this.civilStatus);
console.log("residenceSince:", this.residenceSince);
console.log("percintNo:", this.percintNo);
console.log("occupation:", this.occupation);
console.log("companyName:", this.companyName);
console.log("purposeOfClearance:", this.purposeOfClearance);
console.log("imageData:", this.imageData);

}


  async save() {
    try {
      const query = `
        INSERT INTO clearance 
        (user_registered_id,date, name, gender, pre_address, pro_address, homeowners, data_of_birth, age, place_birth, contact_no, civil_status, residence, percint_no, occupation, company_name, purpose, verify)
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
     const [rows, fields] = await conn.execute(query, [
    this.userID,
    this.date,
    this.fullname,
    this.gender,
    this.presentAddress,
    this.provincialAddress,
    this.organization,
    this.dateOfBirth,
    this.age,
    this.placeOfBirth,
    this.contactNo,
    this.civilStatus,
    this.residenceSince,
    this.percintNo,
    this.occupation,
    this.companyName,
    this.purposeOfClearance,
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

module.exports = Clearance
