const express=require("express")
const router = express.Router({mergeParams:true})
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Review=require("../models/review.js");
const {IsLoggedIn,isreviewAuthor,validatereview}=require("../middleware.js")
const reviewcontroller=require("../controllers/review.js")

router.post("/", IsLoggedIn, validatereview, wrapAsync(reviewcontroller.new));

router.delete("/:reviewId",isreviewAuthor, wrapAsync(reviewcontroller.destroy));
module.exports=router