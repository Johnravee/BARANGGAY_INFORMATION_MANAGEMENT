const express = require('express')
const User = require('../models/User')
const bcrypt = require("bcrypt")
const router = express.Router()



//authenticate before redirecting
router.get('/register', (req, res)=>{
      const isAuthenticated = req.session.AUTH
    const userData =    req.session.USERDATA

    if(isAuthenticated && userData) res.redirect("/brrs")
        else res.render("signin")
})



//Register process
router.post("/register", async (req, res)=>{
    const {fullname, userName, email, contactNo, password} = req.body

    console.log(fullname, userName, email, contactNo, password)
    const encryptedPass = await bcrypt.hash(password, 10)
    const user = new User(null, fullname, userName, email, contactNo, encryptedPass)
    const regResult = user.register()
    
    if(regResult) {
        res.send(`
            <script>
                alert("Registration successful! You can now login.")
                window.location.href = "/login" 
            </script>
        `)
    } else {
        //lagay nalang dito nalang alert
        res.status(400).send(false)
    }
})

module.exports = router