const express=require("express")
const router=express.Router()
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const {IsLoggedIn,isOwner,validateListing}=require("../middleware.js")
const User=require("../models/user.js")
const listingcontroller=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require("../Cloudconfig.js")
const upload = multer({ storage })

//Index Route
//Create Route

router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(upload.single('listing[image]'),validateListing, wrapAsync(listingcontroller.create))

//New Route
router.get("/new",IsLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
//update route
//Delete Route
router.route("/:id")
.get(wrapAsync( listingcontroller.show))
.put(upload.single('listing[image]'),validateListing,wrapAsync(listingcontroller.update))
.delete(IsLoggedIn,isOwner, wrapAsync(listingcontroller.destroy));


//Edit Route
router.get("/:id/edit",IsLoggedIn,isOwner, wrapAsync(listingcontroller.edit));
module.exports=router

