const { render } = require("ejs");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
    index: (req,res) => {
        res.render("welcome");
    },
    showSecQuestions: (req, res) => {
        res.render("securityQuestions");
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

    // exports.showSecQuestions = (req, res) => {
    //     res.render("securityQuestions");
    // };

    // exports.showForgot = (req,res) => {
    //     res.render("forgotPassword");
    // };

    // exports.showHome = (req,res) => {
    //     res.render("home");
    // };

    // exports.showProfile = (req,res) => {
    //     res.render("profilePage");
    // };

    // exports.showSIerror=(req,res) =>{
    //     res.render("signinError");
    // };

    // exports.showSUerror=(req,res) =>{
    //     res.render("signupError")
    // }
