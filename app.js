require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate")
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Review=require("./models/review.js");
const listings=require("./router/listing.js")
const reviews=require("./router/review.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const Localstrategy=require("passport-local")
const User=require("./models/user.js")
const user=require("./router/user.js")
const atlasdb_url=process.env.ATLASDB
const MongoStore = require('connect-mongo');
const store=MongoStore.create({
   mongoUrl: atlasdb_url,
   crypto:{
    secret:process.env.SECRET
   },
   touchAfter: 24*3600
})
const sessionoptions={
  store,
  secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now() + 7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true
    }
}
app.use(session(sessionoptions))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(atlasdb_url);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user
  next()
})
// app.get("/demouser",async (req,res)=>{
//   let fakeuser=new User({
//     email:"student@gmail.com",
//     username:"student_20"
//   })
//   let userregister=await User.register(fakeuser,"hello")
//   res.send(userregister)
// })
app.get("/", (req, res) => {
    res.redirect("/listings");
});
app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)
app.use("/",user)

app.all("*",(req,res,next)=>{
  next(new ExpressError(404," this page not found"))
})
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error", { message });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});