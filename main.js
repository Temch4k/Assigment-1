const user = require("./models/user.js");

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController.js"),
    errorController = require("./controllers/errorController.js"),
    userController = require("./controllers/userController.js"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    flash = require('express-flash'),
    session = require('express-session'),
    bcrypt = require('bcrypt');

LocalStrategy = require('passport-local').Strategy;

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
));

//store session data in this db

var MongoDBStore = require('connect-mongodb-session')(session);

const sessionData = 'mongodb://localhost/express-passport'

var store = new MongoDBStore({
    uri: sessionData,
    collection: 'sessions'
});



//Then store user data in this db

const userData = 'mongodb://localhost/userData'

var store = new MongoDBStore({
    uri: userData,
    collection: 'users'
})

app.use(express.static(__dirname + '/public'));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))
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
app.use(passport.initialize());
app.use(passport.session());

const User = user;

app.post('/signUp', async (req, res, next) => {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.txtPW, salt, function (err, hash) {
            if (err) return next(err);
            new User({
                fName: req.body.textFirstName,
                lName: req.body.txtLastName,
                email: req.body.txtEmail,
                password: req.body.txtPW,
                number: req.body.txtTele,
                biography: req.body.txtBiography,
                birthday: req.body.txtDOB
            }).save()
            req.flash('info', 'Account made, please log in...');
            res.redirect('/signin');
        });
    });
});

app.post('/signin', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}));

app.get('/home', function (request, response) {
    response.render('pages/home');
});

/* This code is based off of JacobWrenns code on the passport/express on github and was changed to work with this assingment*/




//mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/yoverse", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

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

app.listen(app.get("port"), () => {
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