const user = require("../models/user");

exports.getAllUsers = (req, res) => {
    user.find({})
        .exec()
        .then(user => {
            res.render("user", {
                user: user
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
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        biography: req.body.biography,
        gender: req.body.gender,
        number: req.body.number
    });
    newUser.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error)
        });
};