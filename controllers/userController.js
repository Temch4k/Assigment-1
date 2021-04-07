const user = require("../models/user");

exports.getAllUsers = (req, res) => {
    user.find({})
        .exec()
        .then(users => {
            res.render("users", {
                users: users
            })
        })
        .catch(error => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};

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

exports.signInUser = async (req, res, next) => {
    console.log("random string")
    const tempUser = await user.findOne({
        email: req.body.txtEmail
    })
    var errorMessage;
    if (tempUser) {
        if (tempUser.password == req.body.txtPassword) {
            res.render("home");
        } else {
            errorMessage = "Incorrect Password"
            console.log(errorMessage)
            res.render("login", {errorMessage})
        }
    } else {
        errorMessage = "Unknown email"
        console.log(errorMessage)
        res.render("login", {errorMessage})
    }
};