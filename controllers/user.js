const User=require("../models/user.js")
module.exports.rendersignup=(req,res)=>{
    res.render("user/signup.ejs")
}
module.exports.signup=async (req,res)=>{
    try{
    let {email,username,password}=req.body
    let user1=new User({ email,username })
    let userregister=await User.register(user1,password)
    console.log(userregister)
    req.login(userregister,(err)=>{
      if(err){
        next(err)
      }
      req.flash("success","user logged in successfully")
      res.redirect("/listings")
    })
    
    }
    catch(err){
        req.flash("error","username or email already exist")
        res.redirect("/signupuser")
    }

}
module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to wanderlust")
    let redirect=res.locals.redirecturl || "/listings"
    res.redirect(redirect)
}
module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      next(err)
    }
    req.flash("success","logged out successfully")
    res.redirect("/listings")
  })
}