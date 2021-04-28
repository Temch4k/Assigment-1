const { redirectView } = require("./controllers/userController.js");
const post = require("./models/post.js"),
    express = require("express"),
    router = require("./routes/index"),
    app = express(),
    homeController = require("./controllers/homeController.js"),
    errorController = require("./controllers/errorController.js"),
    userController = require("./controllers/userController.js"),
    postController = require("./controllers/postController.js"),
    methodOverride = require("method-override"),
    passport = require('passport'),
    cookieParser = require("cookie-parser"),
    expressSession = require('express-session'),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    passportLocal = require("passport-local"),
    flash = require('express-flash'),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser');
    // passportLocal = require("passport-local"),
    // LocalStrategy = require('passport-local').Strategy;

var MongoDBStore = require('connect-mongodb-session')(expressSession);

mongoose.connect("mongodb://localhost:27017/yoverse", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

const sessionData = 'mongodb://localhost/express-passport'

var store = new MongoDBStore({
    uri: sessionData,
    collection: 'sessions'
});

app.use(expressValidator());

app.use(express.static(__dirname + '/public'));
console.log(__dirname);
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.json());

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`)
});

app.use(cookieParser("my_passcode"));
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use("/", router);

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