const Review = require("../models/review.js");
const Listing = require("../models/listing.js");




module.exports.createReview = async (req, res) => {
    
    //let listing = await Listing.findById(req.params.id);

    let {id} = req.params;
    const listing = await Listing.findById(id); 
    const review = new Review(req.body.review);

    review.author = req.user._id;
    console.log(review);

    listing.reviews.push(review);

    review.listing = listing;

    await review.save();
    await listing.save();

     req.flash("success", "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
};


//delete review controller
module.exports.deleteReview = async (req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
     req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};