const express = require('express');
const formSubmission = require('../models/formSubmission')
const router = express.Router()
const multer  = require('multer')
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

//Authenticate before render
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

//Clearance insert process
router.post("/clearance", upload.single('validID'), async (req, res) => {
  try {

    const imageData = req.file.buffer
    const {
     visits,
  clearanceNo,
  dateIssued,
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


  
   
    const newClearance = new formSubmission(userID.id, date, fullname, gender, presentAddress, provincialAddress, organization, dateOfBirth, age, placeOfBirth, contactNo, civilStatus, residenceSince, percintNo, occupation, companyName, purposeOfClearance, imageData)

  


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



//Authenticate before render
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




//Authenticate before render
router.get("/businesspermit", async (req, res)=>{
     const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("businesspermit")
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
})


//gamit ka multer sa post request sundan mo 'yung ginawa ko sa clearance kunin mo  'yung name ng file input 
//upload.fields([{ name: 'validID', maxCount: 1 }, { name: 'phototaken', maxCount: 1 }]) ikaw na magrefactor nito kinukuha nito 'yung dalwang file input sa bpermit
//  const validIDData = req.files['validID'][0].buffer;
// const secondaryIDData = req.files['secondaryid'][0].buffer; 
//sundan mo lang kung paano ginawa ko sa clearance

router.post("/businesspermit", async(req, res)=>{
    //dito mo gawin 'yung pagkuha ng data sa form
    //ikaw na bahala sa pagiinsert
})



//Authenticate before render
router.get("/baranggayid", async(req, res)=>{
    const isAuthenticated = await req.session.AUTH
    const userData = await req.session.USERDATA

    if (isAuthenticated && userData) {
        res.render("papabaranggayid")
    } else {
        console.log("Session expired. Redirecting to login.")
        res.redirect("/");
    }
})


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




module.exports = router