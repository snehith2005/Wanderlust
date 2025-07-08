const express=require("express")
const router = express.Router()
const User=require("../models/user")
const wrapAsync=require("../utils/wrapAsync")
const passport=require("passport")
const { saveredirecturl } = require("../middleware")
const usercontroller=require("../controllers/user.js")
router.get("/signupuser",usercontroller.rendersignup)
router.post("/signup",wrapAsync(usercontroller.signup))
//login get and post
router.route("/login")
.get(usercontroller.renderlogin)
.post(saveredirecturl,passport.authenticate('local',{ 
    failureRedirect:"/login",
    failureFlash:true
}),wrapAsync(usercontroller.login))
router.get("/logout",usercontroller.logout)
module.exports=router