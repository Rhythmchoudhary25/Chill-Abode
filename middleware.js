const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

/*
The isLoggedIn middleware checks if a user is authenticated before allowing access to certain routes.

If the user is not authenticated (!req.isAuthenticated()):
It saves the current URL to req.session.redirectUrl (so the user can be redirected back after login).
It sets a flash message: "you must be logged in!"
It redirects the user to the /login page.
If the user is authenticated, it calls next() to proceed to the next middleware or route handler.

used in listings.js
*/
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {

        //redirect url
        req.session.redirectUrl = req.originalUrl;
        
        req.flash("error", "you must be logged in!");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


//authorization middleware to check if the logged in user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    
        let listing = await Listing.findById(id);
    
        if(!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You do not have permission to do that!");
            return res.redirect(`/listings/${id}`);
        }
        next();
};


//for review authorization if needed in future
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


//schema validation with joi
module.exports.validateListing = (req, res, next) => {
    const {error} = listingSchema.validate(req.body);
    if(error){
        let errorMessage = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errorMessage);
    }else{
        next();
    }
};


//schema validation for review
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMessage = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errorMessage);
    }else{
        next();
    }
};


