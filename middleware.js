const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");
const { Store } = require("express-session");
module.exports.IsLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirecturl=req.originalurl
        req.flash("error", "You need to login first!");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveredirecturl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl
    }
    next()
}
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  console.log("Listing owner:", listing.owner);
  console.log("Current user:", res.locals.currUser);

  if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you don't have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.validatereview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    // Join all validation error messages into one readable string
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
module.exports.isreviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not available");
    return res.redirect(`/listings/${id}`);
  }

  if (!req.user || !review.author.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};


module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    // Join all validation error messages into one readable string
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


