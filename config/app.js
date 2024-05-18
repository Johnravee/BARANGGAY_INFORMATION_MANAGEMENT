const express = require('express')
const path = require('path')
const session = require('express-session')

const userRouter = require('../Routers/userAuth')
const userRegistration = require('../Routers/userRegistration')
const userpageRouter = require('../Routers/userpageRouter')
const forgotPassRouter = require('../Routers/forgotPassRouter')
 
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 1200;

app.use(session({
  secret: `Sabi nila, langit ka, lupa lang ako
Wala daw akong ka-pag-asa, pag-asa sayo
Ngayong gabi sa mga bituin makikisabay ako
Baka sakaling pagbalik nila sa langit, mapalapit sa'yo`,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use("/css", express.static(path.join(__dirname, "../public/CSS")))
app.use("/images", express.static(path.join(__dirname, "../public/images")))
app.use("/js", express.static(path.join(__dirname, "../public/js")))
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")



//Routers
app.use("/", userRouter)
app.use("/", userpageRouter)
app.use("/", userRegistration)
app.use("/", forgotPassRouter)


//authenticate before redirecting
app.get("/", (req, res)=>{
        const isAuthenticated = req.session.AUTH
    const userData =    req.session.USERDATA

    if(isAuthenticated && userData) res.redirect("/brrs")
        else res.render("homepage")
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
