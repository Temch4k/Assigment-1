"use strict";
const flashMessages = require("connect-flash");
const {
    NETWORK_AUTHENTICATION_REQUIRED
} = require("http-status-codes");
const passport = require("passport");
const Post = require("../models/post");
const hashtag = require("../models/hashtag");
const post = require("../models/post");
const User = require("../models/user"),
    getUserParams = body => {
        var bd = JSON.stringify(body.txtDOB);
        bd = bd.substr(1, 10);
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
            securityQuestion1: body.q1,
            securityQuestion2: body.q2,
            securityQuestion3: body.q3,
            securityQuestion1Answer: body.a1,
            securityQuestion2Answer: body.a2,
            securityQuestion3Answer: body.a3,
            posts: body.posts,
        };
    };

module.exports = {
    login: (req, res) => {
        res.locals.letsGo = "ye";
        res.render("user/login");
    },
    forgotPassword: (req, res) => {
        res.render("user/forgotPassword");
    },
    indexView: (req, res) => {
        res.render("user/index"); //come back to
    },
    new: (req, res) => {
        res.render("user/signup");
    },
    showHome: (req, res) => {
        res.render("user/home2");
    },
    showSecQuestions: (req, res) => {
        res.render("user/securityQuestions");
    },
    showProfileSettings: (req, res) => {
        res.render("user/profilePage");
    },
    showSecurityQuestions: (req, res) => {
        res.render("user/securityQuestions");
    },
    showProfile: (req, res) => {
        res.render("user/Profile");
    },
    showUnfinished: (req, res) => {
        res.render("user/profileSettings");
    },
    create: (req, res, next) => {
        console.log("Entering user.create")
        if (req.skip) {
            return next();
        }
        let userParams = getUserParams(req.body);
        User.create(userParams)
            .then(user => {
                console.log(userParams)
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/signup";
                next();
            });
    },
    validate: (req, res, next) => {
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
        req.check("a1", "Security Question cannot be empty").notEmpty();
        req.check("a2", "Security Question cannot be empty").notEmpty();
        req.check("a3", "Security Question cannot be empty").notEmpty();
        req.check("a3", "Security Question cannot be empty").notEmpty();
        req.check("q1", "Security Question cannot be empty").notEmpty();
        req.check("q2", "Security Question cannot be empty").notEmpty();
        req.check("q3", "Security Question cannot be empty").notEmpty();
        req.check("password", "Password must contain one capital, one lower, and one number").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/)

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;

                res.locals.redirect = "signup";
                next();
            } else {
                next();
            }
        })
    },
    validateEdit: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("fist", "First name not valid").notEmpty()
        req.check("last", "Last name not valid").notEmpty()
        req.check("birthday", "Birthday has to be earlier than today").notEmpty()
        req.check("number", "Number cant be empty").notEmpty()
        req.check("gender", "Gender not valide").notEmpty()

        req.check("email", "email is not valid").isEmail();
        req.check("biography", "Biography is not valid").notEmpty().isLength({
            min: 1,
            max: 500
        });
        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;

                res.locals.redirect = "/user/home";
                next();
            } else {
                next();
            }
        })
    },
    checkSecurityQuestions: (req, res, next) => {
        let answer1 = req.body.a1;
        let answer2 = req.body.a2;
        let answer3 = req.body.a3;
        console.log(answer1)
        console.log(answer2)
        console.log(answer3)
        console.log(res.locals.currentUser.securityQuestion1Answer)
        console.log(res.locals.currentUser.securityQuestion2Answer)
        console.log(res.locals.currentUser.securityQuestion3Answer)
        if (res.locals.currentUser.securityQuestion1Answer != answer1 || res.locals.currentUser.securityQuestion2Answer != answer2 || res.locals.currentUser.securityQuestion3Answer != answer3) {
            console.log("failure")
            res.locals.redirect = "/user/securityQuestions"
            next();
        } else {
            console.log("success")
            res.locals.redirect = "/user/changePassword"
            next();
        }
    },
    authenticate: (req, res, next) => {
        console.log("entering authenticate")
        console.log(req.body.email);
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    console.log(req.body)
                    console.log("this is before password Comparison")
                    user.passwordComparison(req.body.password).then(passwordsMatch => {
                        console.log("this is passed password Comparison")
                        if (passwordsMatch) {
                            console.log("we matched <3")
                            res.locals.redirect = "home";
                            req.flash("success", `${user.fullName}'s logged in successfully!`);
                            res.locals.user = user;
                        } else {
                            failureFlash: "error",
                            "Failed to log in user account: Incorrect Password.";
                            res.locals.redirect = "login";
                        }
                        next();
                    });
                } else {
                    failureFlash: "error",
                    "Failed to log in user account: User account not found.";
                    res.locals.redirect = "login";
                    next();
                }
            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    },
    showChangePassword: (req, res) => {
        res.render("user/changePassword");
    },
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "you've been logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log(redirectPath);
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.username;
        User.findOne({
                username: userId
            })
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by username: ${error.message}`);
            });
    },
    showView: (req, res) => {
        res.render("user/show");
    },
    edit: (req, res, next) => {
        res.render("user/editProfile")
    },
    update: (req, res, next) => {
        if (req.skip) {
            return next();
        }
        var bd = JSON.stringify(req.body.birthday);
        bd = bd.substr(1, 10);
        let userId = req.params.id;
        User.findByIdAndUpdate(userId, {

                $set: {
                    'name.first': req.body.first,
                    'name.last': req.body.last,
                    email: req.body.email,
                    biography: req.body.biography,
                    birthday: req.body.birthday,
                    numBiDay: bd,
                    gender: req.body.gender,
                    number: req.body.number
                }
            })
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
    updateSecurityQuestions: (req, res, next) => {
        let user = req.params.id;
        let currentUserID = res.locals.currentUser._id;
        var username = res.locals.currentUser.username;

        let secQ1 = req.body.q1;
        let secQ2 = req.body.q2;
        let secQ3 = req.body.q3;

        if (currentUserID == user) {
            Post.create(newPost)
                .then(p => {
                    // add post to user object
                    User.findByIdAndUpdate(user, {
                        $push: {
                            securityQuestion1Answer: secQ1
                        }
                    })
                    User.findByIdAndUpdate(user, {
                        $push: {
                            securityQuestion2Answer: secQ2
                        }
                    })
                    User.findByIdAndUpdate(user, {
                            $push: {
                                securityQuestion3Answer: secQ3
                            }
                        })
                        .then(user => {
                            console.log("Security Questions added");
                            res.locals.redirect = "/user/Login";
                            next();
                        })
                        .catch(error => {
                            console.log(`Error fetching user by ID: ${error.message}`);
                            next(error);
                        })
                })
                .catch(error => {
                    console.log(`Error saving post: ${error.message}`)
                    next(error)
                })
        }
    },
    updatePassword: (req, res, next) => {
        if (req.skip) {
            return next();
        }
        let userId = req.params.id;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        if (password != confirmPassword) return next();
        User.findByIdAndUpdate(userId, {

                $set: {
                    password: req.body.password
                }
            })
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
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        })
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown error."
            };
        }
        res.json(errorObject);
    },
    showAllUsers: (req, res) => {
        res.render("user/allUsers");
    },
    AllUsers: (req, res, next) => {
        User.find().sort({
                date: -1
            })
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching post data: ${error.message}`);
                next(error);
            });
    },
    searchUsers: (req, res, next) => {
        console.log(req.body.search)
        // if body id empty then we didnt find anyone
        if (!req.body.search) {
            User.find().sort({
                    date: -1
                })
                .then(users => {
                    res.locals.users = users;
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching user data: ${error.message}`);
                    next(error);
                });
            res.locals.users = "/user/allUsers";
            next();
        } else {
            User.find({username: {$regex: req.body.search}}).exec(function (err, user) {
                if (err)
                {

                } else {
                    console.log(user);
                    res.locals.users = user;
                    next();
                }
            });
        }
    },
    follow: (req, res, next) => {
        let personToFollow = req.params.id,
            curr = res.locals.currentUser.username;
            console.log(personToFollow+" "+curr);
        if (curr) {

            // add to the following list
            User.update({username: curr}, {$push: {following: personToFollow}})
                .then(() => {
                    // the person we just followed will get a follower in their list
                    User.update({username: personToFollow}, {$push: {followers: curr}})
                    .then(() => {
                        res.locals.success = true;
                        next();
                    })
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    },
    unfollow: (req, res, next) => {
        let personToUnfollow = req.params.id,
            curr = res.locals.currentUser.username;
            console.log(personToUnfollow+" "+curr);
        if (curr) {
            // remove the person we just unfollowed from our list
            User.update({username: curr}, {$pull: {following: personToUnfollow}})
                .then(() => {
                    // the person we just unfollowed will get an unfollower in their list
                    User.update({username: personToUnfollow}, {$pull: {followers: curr}})
                    .then(() => {
                        res.locals.success = true;
                        next();
                    })
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    },
    showFollowing:(req, res, next) =>{
        let whosfollowings = req.params.username
        User.find({followers: whosfollowings}).sort({
            date: -1
        })
        .then(users => {
            res.locals.users = users;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user data: ${error.message}`);
            next(error);
        });
    },
    showFollowers:(req, res, next) =>{
        let whosFollowers = req.params.username
        User.find({following: whosFollowers}).sort({
            date: -1
        })
        .then(users => {
            res.locals.users = users;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user data: ${error.message}`);
            next(error);
        });
    },
    showHashtags: (req, res) => {
        res.render("user/hashtags");
    },
    allHashtags: (req, res, next) => {
        hashtag.find().sort({
                date: -1
            })
            .then(hashtags => {
                res.locals.hashtags = hashtag;
                next();
            })
            .catch(error => {
                console.log(`Error fetching hashtag data: ${error.message}`);
                next(error);
            });
    },
    showNotifications: (req, res) => {
        res.render("user/notification")
    },
    allNotifications:  (req, res, next) => {
        var arrayOfIds = res.locals.currentUser.followPosts;
             Post.find({_id:{ $in: arrayOfIds }})
                .then(post => {
                    console.log(post);
                    res.locals.notif = post;
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching posts: ${error.message}`);
                    next(error);
                });
        },
    findSpecificTrendingTag: (req, res, next) => {
        console.log("It got into find specific trending posts.")
        var trendingtag = req.params.id;
        hashtag.findOne({text: trendingtag})
            .then(tag => {
                var pst = tag.posts;
                console.log(pst)
                Post.find({_id:{ $in : pst}})
                .then(posts => {
                    console.log(posts);
                    res.locals.trendingTag = posts;
                    next();
                }) 
                .catch(error => {
                    console.log(`Error fetching posts: ${error.message}`);
                    next(error);
                })

            });
    },
    showTrendingTag: (req, res) => {
        res.render("user/trendingHashTags")
    }        
}

exports.getProfilePage = (req, res) => {
    res.render("profilePage");
};

exports.saveUser = async (req, res, next) => {
    const tempUser = await user.findOne({
        email: req.body.txtEmail
    })
    let errorMessage
    console.log(typeof (errorMessage))
    if (tempUser) {
        errorMessage = 'That email is taken, try logging in dude.'
        console.log(errorMessage)
        res.render("signup", {
            errorMessage
        })
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
        } else {
            console.log(errorMessage)
            console.log(newUser)
            res.render("signup", {
                errorMessage
            })
        }
    }
};
