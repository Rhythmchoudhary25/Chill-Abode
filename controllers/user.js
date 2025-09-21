const User = require("../models/user.js");


//signup form
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
    //res.send("form");
};


//signup logic
module.exports.signup = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        //automatically login
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to ChillAbode!");
            res.redirect("/listings");
        });
        
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


//login form
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};


//login logic
module.exports.login = async (req, res) => {
    req.flash("success", "Welcomeback!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


//logout logic
module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "User logged out!");
        res.redirect("/listings");
    })
};