// Dax's passport
// const user = require("./models/user.js");

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController.js"),
    errorController = require("./controllers/errorController.js"),
    userController = require("./controllers/userController.js"),

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
    LocalStrategy = require('passport-local').Strategy;

// Dax's passport
/*
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            email: username
        }, (err, user) => {
            if (err) return done(err)
            if (!user) return done(null, false, {
                message: 'User not found!'
            });
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err)
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect password!'
                    });
                }
            })
        })
    }
));*/

//store session data in this db

mongoose.connect("mongodb://localhost:27017/yoverse", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

var MongoDBStore = require('connect-mongodb-session')(session);

const sessionData = 'mongodb://localhost/express-passport'

var store = new MongoDBStore({
    uri: sessionData,
    collection: 'sessions'
});


router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.json());

//Cookie stuff for later from authclasswork
/*
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));*/

// passport stuff for later
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());


//flash stuff for later
/*
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});*/

// express vlaidator for later
/*
router.use(expressValidator());*/


app.use(flash())
app.use(session({
    secret: 'something Super Sneaky',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

// Dax's passport
// app.use(passport.initialize());
// app.use(passport.session());




app.post('/loginUser', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}));


app.get("/", homeController.showIndex);


app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`)
});


router.get("/signup", homeController.showSignUp);
router.get("/signin", homeController.showSignIn);
router.get("/securityQuestions", homeController.showSecQuestions);
router.get("/forgotPassword", homeController.showForgot);
router.get("/home", homeController.showHome);



router.get("/profilePage", homeController.showProfile);
router.get("/sigine", homeController.showSIerror);
router.get("/signupe", homeController.showSUerror);



router.post("/signUpAcc",userController.saveUser);
router.post("/signInUser",userController.signInUser);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);


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