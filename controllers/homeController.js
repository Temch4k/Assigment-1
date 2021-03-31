exports.showHome = (req, res) => {
    res.render("signup");
}

exports.showIndex = (req,res) => {
    res.render("home");
};

exports.showSignIn = (req,res) => {
    res.render("login");
};
exports.showSignUp = (req,res) => {
    res.render("signup");
};
exports.showSecQuestions = (req,res) => {
    res.render("securityQuestions");
};