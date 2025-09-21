// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
  // DO NOT add a plain password field when using passport-local-mongoose
});

userSchema.plugin(passportLocalMongoose); // adds username, hash, salt, register(), etc.

module.exports = mongoose.model("User", userSchema); 