const { render } = require("ejs");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
    index: (req,res) => {
        res.render("welcome");
    },
    showForgot: (req, res) => {
        res.render("forgotPassword");
    },
    showHome: (req, res) => {
        res.render('home', {
            User: User,
            userArray: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
            post: [{type: mongoose.Schema.Types.ObjectId, ref: User.posts}]
        });
    },
    showProfile: (req, res) => {
        res.render("profilePage");
    },
    showSIerror: (req, res) => {
        res.render("signinError");
    },
    showSUerror: (req, res) => {
        res.render("signupError")
    }
}

exports.showUsers = (req, res) => {
    res.render('home', {
                  user: users
          });
}
