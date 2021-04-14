
module.exports = {
    index: (req,res) => {
        res.render("welcome");
    }
}

exports.showHome = (req, res) => {
    res.render("home");
};
exports.showSignIn = (req, res) => {
    res.render("login");
};
exports.showSignUp = (req, res) => {
    res.render("signup");
};
exports.showSecQuestions = (req, res) => {
    res.render("securityQuestions");
};

exports.showForgot = (req,res) => {
    res.render("forgotPassword");
};

exports.showProfile = (req,res) => {
    res.render("profilePage");
};

exports.showSIerror=(req,res) =>{
    res.render("signinError");
};

exports.showSUerror=(req,res) =>{
    res.render("signupError")
}