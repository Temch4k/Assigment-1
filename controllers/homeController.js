
module.exports = {
    index: (req,res) => {
        res.render("welcome");
    }
}


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