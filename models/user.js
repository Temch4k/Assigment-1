const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        Fname: String,
        Lname: String,
        email: String,
        birthday: Date,
        biography: String,
        gender: String,
        number: String,
        password: String
    });

userSchema.plugin(passportLocalMongoose,{
    usernameField: "email"
});
module.exports = mongoose.model("User", userSchema);