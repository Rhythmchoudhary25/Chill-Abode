const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");
const user = require("../models/user.js");


router.route("/signup")
    //signup form
    .get(userController.renderSignup)
    //signup logic
    .post(wrapAsync(userController.signup));


//login routes

router.route("/login")
    //login form
    .get(userController.renderLogin)
    //login logic
    .post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),  
    userController.login
);


//logout logic
router.get("/logout", userController.logout);


module.exports = router;