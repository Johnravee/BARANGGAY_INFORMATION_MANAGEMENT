const express = require('express');
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const router = express.Router()





//authenticate before redirecting
router.get('/login', async (req, res)=>{
    const isAuthenticated = req.session.AUTH
    const userData =    req.session.USERDATA

    if(isAuthenticated && userData) res.redirect("/brrs")
        else res.render("login")
})


//login process
router.post("/login", async (req, res)=>{
    const {username, password} = req.body
    
    const userLogin = new User(null,null,username,null,null,password)
  userLogin.login()
    .then(({ queryResult, authenticationResult }) => {
        if (queryResult && authenticationResult) {
            
           
            req.session.AUTH = authenticationResult
           req.session.USERDATA = queryResult


            console.log( req.session.AUTH, req.session.USERDATA );
           res.redirect("/brrs")


           
        } else {
            
            console.log("NONO");
            res.send(`
            <script>
                alert("Login failed! Please try again.");
                window.location.href = "/login"; 
            </script>
        `);
        
        }
    })
    .catch(error => {
        console.error("Login error:", error);

    });



})

module.exports = router
