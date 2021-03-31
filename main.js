const express = require("express"), app = express(),
homeController = require("./controllers/homeController.js"),
errorController = require("./controllers/errorController.js"),
userController = require("./controllers/userController.js"),
layouts = require("express-ejs-layouts"),mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/yoverse",
    {useNewUrlParser: true});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

app.use(express.static("public"))
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/home", homeController.showHome);

app.listen(app.get("port"),() =>{
    console.log(`Server is running on port ${app.get("port")}`)
});


app.get("/signup", homeController.showSignUp);
app.get("/signin", homeController.showSignIn);
app.get("/securityQuestions", homeController.showSecQuestions);
app.get("/forgotPassword", homeController.showForgot);
app.get("/home", homeController.showHome);

app.get("/profilePage", homeController.showProfile);
app.get("/home", homeController.showHome);




function validateForm() {

    var formIsValid = true;
    var password = document.querySelector("#txtPW");
    var confirmPassword = document.querySelector("#txtPW2");
    var passwordError = document.querySelector("#passwordError")
    var passwordHasError = false;

    if (password.value != confirmPassword.value) {
        formIsValid = false;
        passwordError.innerHTML = "Passwords must match."
        passwordError.classList.remove("invisible");
        passwordHasError = true
    } else {
        passwordError.innerHTML = ""
        passwordError.classList.add("invisible")
    }
    var elements = document.getElementsByTagName("input");
    var invalidChars = ['<', '>', '#', '{', '}', '(', ')', '!', '~', '"', "'", '`'];

    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < invalidChars.length; j++) {
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                elements[i].classList.add("hasError");
                formIsValid = false;
                passwordHasError = true;
                var divInvalidChar = document.querySelector("#divInvalidCharError");
                divInvalidChar.classList.remove("invisible");
                divInvalidChar.innerHTML = "You have entered an invalid char(#, !, ~, {, }, (, ), ', ) in the form. Please remove the char and try again."
            }
        }
    }
    if (checkPassword(password) != true) {
        passwordError.innerHTML = "Your password must include one number, one uppercase and one lowercase letter";
        formIsValid = false;
        passwordHasError = true;
    }
    if (!passwordHasError) {
        passwordError.innerHTML = ""
        passwordError.classList.add("invisible")
    }
    return formIsValid;
}

function checkPassword(inputText) {
    var passw = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputText.value.match(passw)) {
        return true;
    } else {
        return false;
    }
}