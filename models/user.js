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

module.exports = mongoose.model("User", userSchema);