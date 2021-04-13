"use strict";

const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    postSchema = new mongoose.Schema({
        _user : {
            type: Number, ref: 'User'
        },
        message : {
            type: String,
            min: 1,
            max: 500
        } 
    });

    postSchema.methods.getInfo = function () {
        return `user: ${this._user} postMessage: ${this._user}`;
    };

    postSchema.methods.findLocalPosts = function () {
        return this.model("Post")
            .find({
            })
            .exec();
    }

module.exports = mongoose.model("post", postSchema);