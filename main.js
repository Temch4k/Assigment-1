// Dax's passport
// const user = require("./models/user.js");

const post = require("./models/post.js");

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController.js"),
    errorController = require("./controllers/errorController.js"),
    userController = require("./controllers/userController.js"),
    postController = require("./controllers/postController.js"),

    User = require("./models/user"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    cookieParser = require("cookie-parser"),
    flash = require('express-flash'),
    session = require('express-session'),
    router = express.Router(),
    methodOverride = require("method-override"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    passportLocal = require("passport-local"),
    LocalStrategy = require('passport-local').Strategy;
    var MongoDBStore = require('connect-mongodb-session')(session);

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



router.use(express.static(__dirname + '/public'));
console.log(__dirname);
//router.use(express.static("public"));
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
router.use(session({
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

// passport stuff for later



//flash stuff for later

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

// express vlaidator for laters
/*
router.use(expressValidator());*/

//app.use(bodyParser.urlencoded());

//app.use(bodyParser.json());

// app.use(flash())
// app.use(session({
//     secret: 'something Super Sneaky',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 // 1 day
//     },
//     store: store,
//     resave: true,
//     saveUninitialized: true
// }));



router.get("/", homeController.index);

// user routing
router.get("/user", userController.indexView);
router.get("/user/login", userController.login);
router.post("/user/login", userController.authenticate);
router.get("/user/signup", userController.new);
router.post("/user/create", userController.create, userController.redirectView);
router.get("/user/forgotPassword", userController.forgotPassword);

router.get("/user/home", userController.showHome);


// home routing
router.get("/securityQuestions", homeController.showSecQuestions);
router.get("/forgotPassword", homeController.showForgot);
router.get("/home", homeController.showHome);
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
/*
Post.create( {
    _user: "",
    body: ""
}).then(post => {
    console.log(post);
    User.findOne({}).then(
        user => {
            user.posts.push(post._id);
            user.save();
            User.populate(user, "posts").then(user =>
                console.log(user));
        }
    )
});
*/