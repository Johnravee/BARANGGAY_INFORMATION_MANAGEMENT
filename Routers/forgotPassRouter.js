const express = require('express')
const router = express.Router()
const {Resend} = require('resend');
const conn = require("../config/connection");



//Ikaw na bahala ditooo men


router.get("/forgot", (req, res)=>{
    res.render("forgotpass")
})

router.post("/forgot", async (req, res, next) => {
    try {
        const { email } = req.body;
        const [rows] = await conn.execute("SELECT * FROM register WHERE email = ?", [email]);

        if (rows.length > 0) {
            req.session.email = rows[0].email;
        } else {
            res.send("Email not found");
            return; 
        }
    } catch (error) {
        console.error("Error querying database:", error);
        res.status(500).send("An error occurred while processing your request.");
        return;
    }


});




router.get("/recover", (req, res) => {
    res.render("newpass");
});






//recover account
//
module.exports = router