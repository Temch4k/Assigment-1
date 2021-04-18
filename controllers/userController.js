"use strict";
const flashMessages = require("connect-flash");
const passport = require("passport");
const post = require("../models/post");
const User = require("../models/user"),
    getUserParams = body => {
        var bd = JSON.stringify(body.txtDOB);
        bd = bd.substr(1,10);
        console.log(bd);
        return {
            name: {
                first: body.textFirstName,
                last: body.textLastName
            },
            email: body.email,
            username: body.username,
            password: body.password, 
            number: body.txtTele,
            biography: body.txtBiography,
            birthday: body.txtDOB,
            numBiDay: bd,
            gender: body.gender,
            posts: body.posts
        };
    };

module.exports={
    login:(req,res)=>{
        res.render("user/login");
    },
    forgotPassword:(req,res)=>{
        res.render("user/forgotPassword");
    },
    indexView: (req, res) =>{
        res.render("user/index");//come back to 
    },
    new: (req, res) =>{
        res.render("user/signup");
    },
    showHome: (req, res) => {
        res.render("user/home2");
    },
    showSecQuestions: (req, res) =>{
        res.render("user/securityQuestions");
    },
    showProfileSettings: (req, res) =>{
        res.render("user/profilePage");
    },
    showProfile: (req, res) =>{
        res.render("user/Profile");
    },
    showUnfinished: (req, res) =>{
        res.render("user/profileSettings");
    },
    create: (req, res, next)=>{
        if(req.skip){
            return next();
        }
        let userParams = getUserParams(req.body);

        let newUser = new User(userParams);
        User.register(newUser, req.body.password, (error, user)=>{
            if(user){
                req.flash("success", "User account created succesfully");
                res.locals.redirect = "securityQuestions";
                next();
            }
            else {
                console.log(error.message);
                req.flash("Error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "signup";
                next();
            }
        })
    },
    validate: (req, res, next) =>{
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        
        req.check("textFirstName", "First name not valid").notEmpty()
        req.check("textLastName", "Last name not valid").notEmpty()
        req.check("txtDOB", "Birthday has to be earlier than today").notEmpty()
        req.check("password", "Passwords must match").equals(req.body.txtPW2)

        req.check("gender", "Gender not valide").notEmpty()

        req.check("email", "email is not valid").isEmail();
        req.check("txtBiography", "Biography is not valid").notEmpty().isLength({
            min: 1,
            max: 500
        });
        req.check("password", "password cannot be empty").notEmpty();

        
        req.getValidationResult().then((error) =>{
            if(!error.isEmpty()){
                let messages = error.array().map (e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;

                res.locals.redirect = "signup";
                next();
            }
            else{
                next();
            }
        })
    },
    authenticate: passport.authenticate("local", {
        successRedirect: "home",
        failureRedirect: "login",
        failureFlash: "Login failed try your credentials again",
    }),
    logout: (req,res,next)=>{
        req.logout();
        req.flash("success", "you've been logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log(redirectPath);
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.username;
        User.findOne({username: userId})
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching user by username: ${error.message}`);
        });
    },
    showView: (req, res) => {
        res.render("user/show");
    },
    edit: (req, res, next)=>{
        res.render("user/editProfile")
    },
    update: (req, res, next) => {
        if(req.skip)
        { 
            return next();
        }
        var bd = JSON.stringify(req.body.birthday);
        bd = bd.substr(1,10);
        let userId = req.params.id;
        User.findByIdAndUpdate(userId,
            {
                
                $set:
                {
                    'name.first': req.body.first,
                    'name.last': req.body.last,
                    email: req.body.email,
                    password: req.body.password,
                    biography: req.body.biography,
                    birthday: req.body.birthday,
                    numBiDay : bd,
                    gender: req.body.gender,
                    number: req.body.number,
                    posts: req.body.post
                }
            }
        )
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/user/home`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    updatePost: (req, res, next) => {
        if(req.skip)
        { 
            return next();
        }
        let userId = req.params.id;
        let updatedUser = new User({
            posts: req.body.posts
        });
        User.findByIdAndUpdate(userId,
            {
                $set:
                {
                    posts: req.body.posts
                }
            }
        )
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/home`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) =>{
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(() =>{
            res.locals.redirect = "/users";
            next();
        })
        .catch(error=>{
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    showAllUsers: (req, res) => {
        res.render("user/allUsers");
    },
    AllUsers: (req, res, next)=>{
        User.find().sort({date:-1})
        .then(users=>{
            res.locals.users = users;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching post data: ${error.message}`);
            next(error);
        });
    },
}

exports.getProfilePage = (req, res) => {
    res.render("profilePage");
};

exports.saveUser = async (req, res, next) => {
    const tempUser = await user.findOne({
        email: req.body.txtEmail
    })
    let errorMessage
    console.log(typeof(errorMessage))
    if (tempUser) {
        errorMessage = 'That email is taken, try logging in dude.'
        console.log(errorMessage)
        res.render("signup", {errorMessage})
    } else {
        let newUser = new user({
            Fname: req.body.textFirstName,
            Lname: req.body.textLastName,
            email: req.body.txtEmail,
            username: req.body.username,
            birthday: req.body.txtDOB,
            biography: req.body.txtBiography,
            gender: req.body.gender,
            number: req.body.txtTele,
            password: req.body.txtPW
        });
        
        let secondaryPassword = req.body.txtPW2
        if (newUser.password != secondaryPassword) {
            errorMessage = "Passwords must match. "
        } else {
            if (newUser.Fname == "" || newUser.Lname == "" || newUser.biography == "" || newUser.email == "" || newUser.gender == "") {
                errorMessage = errorMessage + "One neccisary field was left blank."
            }
        }
        if (errorMessage == undefined) {
            console.log(newUser);
            newUser.save()
                .then(() => {
                    res.render("login");
                })
                .catch(error => {
                    res.send(error)
                });
        }else{
            console.log(errorMessage)
            console.log(newUser)
            res.render("signup", {errorMessage})
        }
    }
};