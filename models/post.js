"use strict";

const passport = require("passport");
const user = require("./user");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    postSchema = new mongoose.Schema({
        userID : {
            type: String
        },
        postBody : {
            type: String,
            min: 1,
            max: 500
        },
        posterName:{
            type: String
        },
        fullName:{
            type: String
        },
        date: { type: Date, default: Date.now },
        dd:{
            type: String
        }
    });
module.exports = mongoose.model("post", postSchema);
