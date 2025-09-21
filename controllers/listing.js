const { model } = require("mongoose");
const Listing = require("../models/listing");


//index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
};


//new route
module.exports.newForm = (req, res) => {
    res.render("listings/new.ejs");
};

/*//show route
module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    //console.log(listing);
    res.render("listings/show.ejs", {listing});
};*/

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");
    
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    // Pass MAP_TOKEN to EJS
    res.render("listings/show.ejs", {
        listing,
        MAP_TOKEN: process.env.MAP_TOKEN, // ✅ this is the fix
        currUser: req.user               // optional if you use currUser in show.ejs
    });
};


//create route
module.exports.createListing = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


//edit route
module.exports.editlisting = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    //for preview of image in edit form
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250,h_250,c_fill,g_auto");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


//update route
module.exports.updateListing = async (req, res) => {
    
    let { id } = req.params;

    /*let listing = await Listing.findById(id);
    // update basic fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    // update image.url only (keep filename safe)
    listing.image.url = req.body.listing.image.url;
*/

    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true });

    if(typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    //await listing.save();
     req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


//delete route
module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(`Deleted Listing: ${deletedListing}`);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};