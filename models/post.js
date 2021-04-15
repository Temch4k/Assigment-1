"use strict";

const passport = require("passport");
const user = require("./user");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    postSchema = new mongoose.Schema({
        _user : {
            type: String, ref: user.first + " " + user.last
        },
        body : {
            type: String,
            min: 1,
            max: 500
        },
        date: { type: Date, default: Date.now }
    });
module.exports = mongoose.model("post", postSchema);
