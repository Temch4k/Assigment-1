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
    if (tempUser) {
        req.flash('error', 'Sorry, that name is taken.')
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
        /*res.render("signup")
        let errorMessage = ""
        let secondaryPassword = req.body.txtPW2
        if (newUser.password != secondaryPassword) {
            errorMessage = "Passwords must match. "
        }
        if (newUser.Fname == "" || newUser.Lname == "" || newUser.biography == "" || newUser.email == "" || newUser.gender == "") {
            errorMessage = errorMessage + "One neccisary field was left blank."
        }
        */
        if (errorMessage == "") {
            console.log(newUser);
            newUser.save()
                .then(() => {
                    res.render("login");
                })
                .catch(error => {
                    res.send(error)
                });
        } else {
            res.render("signup")
        }
    }
};

exports.login = async (req, res, next) => {
    const tempUser = await user.findOne({
        email: req.body.txtEmail
    })
    if (tempUser) {
        if (tempUser.password == req.body.txtPassword) {
            res.render("home");
        } else {
            res.render("home");
        }
    } else {
        res.render("home")
    }
};