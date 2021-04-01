const mongoose = require("mongoose"),
    user = mongoose.Schema({
        name: String,
        email: String,
        birthday: Date,
        biography: String,
        gender: String,
        number: String
    });

module.exports = mongoose.model("User", user, "myData");