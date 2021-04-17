const post = require("./models/post.js");

    const express = require("express"),
    router = express.Router(),
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

router.use(expressValidator())

router.use(express.static(__dirname + '/public'));
console.log(__dirname);
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.json());

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`)
});

//Cookie stuff for later from authclasswork

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());


//flash stuff for later

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});


//app.use(bodyParser.urlencoded());

//app.use(bodyParser.json());

// if(loggedIn)
// {
//     router.get("/user/login", userController.showHome);
//     router.get("/user/signup", userController.showHome);
//     router.get("/user/forgotPassword", userController.forgotPassword);
// }


router.get("/", homeController.index);

// user routing
router.get("/user", userController.indexView);
router.get("/user/login", userController.login);
router.post("/user/login", userController.authenticate);

router.get("/user/signup", userController.new);
router.post("/user/create", userController.validate, userController.create, userController.redirectView);
router.get("/user/forgotPassword", userController.forgotPassword);

router.get("/user/home", userController.showHome);


// home routing
router.get("/user/securityQuestions", userController.showSecQuestions);
router.get("/profilePage", homeController.showProfile);

// still need login procedure

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

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