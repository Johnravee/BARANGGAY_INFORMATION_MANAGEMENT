const conn = require("../config/connection");

class Permit {
      constructor(userID, owner, owneraddress, businessname, businessaddress, businesstype, contactno, property, dtinum, validID, govid) {
    this.userID = userID;
    this.owner = owner;
    this.owneraddress = owneraddress;
    this.businessname = businessname;
    this.businessaddress = businessaddress;
    this.businesstype = businesstype;
    this.contactno = contactno;
    this.property = property;
    this.dtinum = dtinum;
    this.validID = validID;
    this.govid = govid;

    console.log("userID:", this.userID);
    console.log("Owner:", this.owner);
    console.log("Owner Address:", this.owneraddress);
    console.log("Business Name:", this.businessname);
    console.log("Business Address:", this.businessaddress);
    console.log("Business Type:", this.businesstype);
    console.log("Contact No:", this.contactno);
    console.log("Property:", this.property);
    console.log("DTI Number:", this.dtinum);
    console.log("Valid ID:", this.validID);
    console.log("Government ID:", this.govid);
  }

  async save() {
    try {
      const query = `
        INSERT INTO permit 
        (user_registered_id, owner_name, owner_address, buss_name, buss_address, buss_type, contact_no, property, dti, up_photo, up_gov)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [rows, fields] = await conn.execute(query, [
        this.userID,
        this.owner,
        this.owneraddress,
        this.businessname,
        this.businessaddress,
        this.businesstype,
        this.contactno,
        this.property,
        this.dtinum,
        this.validID,
        this.govid
      ]);

      console.log("Data inserted successfully:", rows);
      return true;
    } catch (error) {
      console.error("Error inserting data:", error);
      return false;
    }
  }
}

module.exports = Permit;
