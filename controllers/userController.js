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

exports.saveUser = (req, res) => {
    let newUser = new user({
        Fname: req.body.textFirstName,
        Lname: req.body.textLastName,
        email: req.body.textEmail,
        birthday: req.body.txtDOB,
        biography: req.body.txtBiography,
        gender: req.body.gender,
        number: req.body.txtTele,
        password: req.body.txtPW
    });
    console.log(newUser);

    newUser.save()
        .then(() => {
            res.render("login");
        })
        .catch(error => {
            res.send(error)
        });
};
