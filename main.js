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




app.post('/loginUser', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}));



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



app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`)
});


app.get("/signup", homeController.showSignUp);
app.get("/signin", homeController.showSignIn);

app.get("/securityQuestions", homeController.showSecQuestions);
app.get("/forgotPassword", homeController.showForgot);
app.get("/home", homeController.showHome);



app.get("/profilePage", homeController.showProfile);
app.get("/sigine", homeController.showSIerror);
app.get("/signupe", homeController.showSUerror);



app.post("/signUpAcc",userController.saveUser);
app.post("/loginUser", userController.login);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);