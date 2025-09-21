const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewcontroller = require("../controllers/review.js");



//review route
//post route
router.post("/", 
    isLoggedIn, 
    validateReview, 
    WrapAsync(reviewcontroller.createReview)
);


//delete review route
router.delete("/:reviewId",
    isLoggedIn, 
    isReviewAuthor, 
    WrapAsync(reviewcontroller.deleteReview)
);

module.exports = router;