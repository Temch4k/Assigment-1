const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        name: String,
        email: String,
        birthday: Date,
        biography: String,
        gender: String,
        number: string
    });

module.exports = mongoose.model("User", userSchema);