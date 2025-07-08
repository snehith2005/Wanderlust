const express=require("express")
const app=express()
const users=require("./routes/users.js")
const posts=require("./routes/post.js")
const cookieparser=require("cookie-parser")
const session=require("express-session")
const flash=require("connect-flash")
const path=require("path")
const { expression } = require("joi")
// app.use(cookieparser("secretcode"))
const sessionoptions=({secret:"mysecret",
    resave:false,
    saveUninitialized:true
})
app.use(session(sessionoptions))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.successMsg=("success","user  registered")
    res.locals.errorMsg=("error","user not registered")
    next()
})
// app.use("/users",users)
// app.use("/posts",posts)
//***********session
app.get("/post",(req,res)=>{
    res.send("sent successfully")
})
app.get("/count",(req,res)=>{
    if(!req.session.count){
        req.session.count=1
    }
    else{
        req.session.count++
    }
    res.send(`sent req ${req.session.count}`)
})
app.get("/register",(req,res)=>{
    let {name="ananymous"}=req.query
    req.session.name=name
    if(req.session.name==="ananymous"){
        req.flash("error")
    }else{
        req.flash("success")
    }
    
    res.redirect("/hello")
})
app.get("/hello",(req,res)=>{
    res.render("hello.ejs",{name: req.session.name})
})
//***********cookies  */
// app.get("/getcookies",(req,res)=>{
//    let {name}=req.cookies
//    res.send(`hi ${name}`)
// })
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("you","arjun",{signed:true})
//     res.send("signed")
// })
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verfied")
// })
app.get("/",(req,res)=>{
    res.send("this is a root")
})
app.get("/",(req,res)=>{
    res.send("this is root")
})
app.listen(8080,()=>{
    console.log("listening to port 8080")
})