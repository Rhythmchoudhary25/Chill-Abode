const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
    //index route
    .get(WrapAsync(listingController.index))
    //create route
    .post(
        isLoggedIn, 
        //validateListing, 
        upload.single('listing[image][url]'),
        validateListing,
        WrapAsync(listingController.createListing)
    );


//new route
router.get("/new", isLoggedIn, listingController.newForm);


router.route("/:id")
    //show route
    .get(WrapAsync(listingController.showListing))
    //update route
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image][url]'),
        validateListing,
        WrapAsync(listingController.updateListing)
    )
    //delete route
    .delete(
        isLoggedIn, 
        isOwner, 
        WrapAsync(listingController.deleteListing)
)


//edit route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    WrapAsync(listingController.editlisting)
);


//update route from chatgpt



module.exports = router;








/* shraddha waala hai
//update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true });
    res.redirect(`/listings/${id}`);
});
*/




/*
//create route from chatgpt
app.post("/listings", WrapAsync(async (req, res, next) => {
    if(!req.body || !req.body.listing){ 
        throw new ExpressError(400, "Invalid Listing Data");
    }
    const newListing = new Listing({
    title: req.body.listing.title,
    description: req.body.listing.description,
    price: req.body.listing.price,
    location: req.body.listing.location,
    country: req.body.listing.country,
    image: {
        url: req.body.listing.image.url
    }
    });
    await newListing.save();
    res.redirect("/listings");
    })
);*/