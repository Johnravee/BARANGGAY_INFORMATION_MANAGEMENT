const express = require('express');
const clearanceformsubmission = require('../models/clearanceformsubmission');
const cedulaformsubmission = require('../models/cedulaformsubmission');
const indigencyformsubmission = require('../models/indigencyformsubmission');
const permitformsubmission = require('../models/permitformsubmission');
const papabaranggayformsubmission = require('../models/papabaranggayformsubmission')
const router = express.Router();
const multer  = require('multer');
const upload = multer()


//Authenticate before render
 router.get("/brrs", async (req, res) => {
    const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("userr", req.session.USERDATA)
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
});

//clearance
router.get("/clearance" ,async (req, res)=>{

    const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA
  
     if (isAuthenticated && userData) {
        res.render("clearance", userData);
    
    } else {
        console.log("Session expired. Redirecting to login.");
        res.redirect("/");
    }
})

router.post("/clearance", upload.single('validID'), async (req, res) => {
  try {

    const imageData = req.file.buffer
    const {
  date,
  surname,
  firstname,
  mi,
  gender,
  presentAddress,
  provincialAddress,
  organization,
  dateOfBirth,
  age,
  placeOfBirth,
  contactNo,
  civilStatus,
  residenceSince,
  percintNo,
  occupation,
  companyName,
  purposeOfClearance
    } = req.body

    const userID = await req.session.USERDATA
    const fullname = firstname + " " + mi + " " + surname


  
   
    const newClearance = new clearanceformsubmission(userID.id, date, fullname, gender, presentAddress, provincialAddress, organization, dateOfBirth, age, placeOfBirth, contactNo, civilStatus, residenceSince, percintNo, occupation, companyName, purposeOfClearance, imageData)
    const isInserted = await newClearance.save()

    if(isInserted) 
        res.send(`
            <script>
                alert("Form submitted successful!");
                window.location.href = "/brrs"
            </script>
        `);

    else  res.send(`
            <script>
                alert("Form submission failed! Please try again.")
                window.location.href = "/clearance"
            </script>
        `);
    


  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.")
  }
});



//Indigency
router.get("/indigency", async(req, res)=>{
     const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("indigency")
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
})


router.post("/indigency", upload.single('validID'), async (req, res) => {
    try {
  
      const imageData = req.file.buffer
      const {
    firstname,
    surname,
    mi,
    address,
    yrofstay,
    purpose,
    patient,
    contactno,
    relationship,
      } = req.body
  
      const userID = await req.session.USERDATA
      const fullname = firstname + " " + mi + " " + surname
  
  
    
     
      const newIndigency = new indigencyformsubmission(userID.id, fullname, address, yrofstay, purpose, patient, contactno, relationship, imageData)
      const isInserted = await newIndigency.save()
  
      if(isInserted) 
          res.send(`
              <script>
                  alert("Form submitted successful!");
                  window.location.href = "/brrs"
              </script>
          `);
  
      else  res.send(`
              <script>
                  alert("Form submission failed! Please try again.")
                  window.location.href = "/indigency"
              </script>
          `);
      
  
  
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.")
    }
  });



//Permit
router.get("/permit", async(req, res)=>{
      const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("permit")
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
})

router.post('/permit', upload.fields([{ name: 'validID', maxCount: 1 }, { name: 'govid', maxCount: 1 }]), async (req, res) => {
    const userData = await req.session.USERDATA
    const userID = userData.id
    console.log("userid:", userID)
    const {
        owner,
        owneraddress,
        businessname,
        businessaddress,
        businesstype,
        contactno,
        property,
        dtinum
      } = req.body;

    try {
        console.log("Form data received:", req.body);
        console.log("Valid ID files:", req.files['validID']);
        console.log("Gov ID files:", req.files['govid']);

        const validID = req.files['validID'][0].buffer;
        const govid = req.files['govid'][0].buffer;

        console.log("Valid ID length:", validID.length);
        console.log("Gov ID length:", govid.length);

  
      const userID = await req.session.USERDATA.id;

      const newPermit = new permitformsubmission(userID, owner,  owneraddress, businessname, businessaddress, businesstype, contactno, property, dtinum, validID, govid)
      const isInserted = await newPermit.save()
  
      if(isInserted) 
          res.send(`
              <script>
                  alert("Form submitted successful!");
                  window.location.href = "/brrs"
              </script>
          `);
  
      else  res.send(`
              <script>
                  alert("Form submission failed! Please try again.")
                  window.location.href = "/permit"
              </script>
          `);
      
  
  
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.")
    }
  });
  
//gamit ka multer sa post request sundan mo 'yung ginawa ko sa clearance kunin mo  'yung name ng file input 
//upload.fields([{ name: 'validID', maxCount: 1 }, { name: 'phototaken', maxCount: 1 }]) ikaw na magrefactor nito kinukuha nito 'yung dalwang file input sa bpermit
//  const validIDData = req.files['validID'][0].buffer;
// const secondaryIDData = req.files['secondaryid'][0].buffer; 
//sundan mo lang kung paano ginawa ko sa clearance


//barangay id
router.get("/papabaranggayid", async(req, res)=>{
    const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("papabaranggayid")
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
})

router.post("/papabaranggayid", upload.single('validID'), async (req, res) => {
    try {
        const imageData = req.file.buffer;
        console.log("imagedata: ", imageData)
        const {
            firstname,
            mi,
            surname,
            address,
            birthday,
            placeofbirth,
            precint,
            contactno,
            gender,
            status,
            purpose,
            height,
            weight,
            nameofparents,
            guardianaddress,
            parentscontactno,
            rs,
        } = req.body;
        
  
      const userID = await req.session.USERDATA
      const name = firstname + " " + mi + " " + surname
  
      const newPapabarangay = new papabaranggayformsubmission(userID.id, name, address, birthday, placeofbirth, precint, contactno, gender, status, purpose, height, weight, nameofparents, guardianaddress, parentscontactno, rs, imageData)
      const isInserted = await newPapabarangay.save()
  
      if(isInserted) 
          res.send(`
              <script>
                  alert("Form submitted successful!");
                  window.location.href = "/brrs"
              </script>
          `);
  
      else  res.send(`
              <script>
                  alert("Form submission failed! Please try again.")
                  window.location.href = "/papabaranggayid"
              </script>
          `);
      
  
  
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.")
    }
  });






router.get("/cedula", async(req, res)=>{
    const isAuthenticated = await req.session.AUTH
   const userData = await req.session.USERDATA

   if (isAuthenticated && userData) {
       res.render("cedula")
   } else {
       console.log("Session expired. Redirecting to login.")
       res.redirect("/");
   }
})


//Cedula insert process
router.post("/cedula", upload.single('validID'), async (req, res) => {
    try {
  
      const imageData = req.file.buffer
      const {
    surname,
    firstname,
    mi,
    address,
    birthdate,
    birthplace,
    citizenship,
    civilstatus,
    idtype,
    idnum,
    height,
    weight,
    gender,
    occupation,
      } = req.body
  
      const userID = await req.session.USERDATA
      const fullname = firstname + " " + mi + " " + surname
  
      const newCedula = new cedulaformsubmission(userID.id, fullname, address, birthdate, birthplace, citizenship, civilstatus, idtype, idnum, height, weight, gender, occupation, imageData)
      const isInserted = await newCedula.save()
  
      if(isInserted) 
          res.send(`
              <script>
                  alert("Form submitted successful!");
                  window.location.href = "/brrs"
              </script>
          `);
  
      else  res.send(`
              <script>
                  alert("Form submission failed! Please try again.")
                  window.location.href = "/cedula"
              </script>
          `);
      
  
  
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.")
    }
  });




module.exports = router