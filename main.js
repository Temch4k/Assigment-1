const {
    redirectView
} = require("./controllers/userController.js");
const {
    deleteOne
} = require("./models/user");
const post = require("./models/post.js"),
    express = require("express"),
    router = require("./routes/index"),
    app = express(),
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
LocalStrategy = require('passport-local').Strategy;

passport.use('local.signin', new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passToCallBack: true
    },
    function (username, password, done) {
        console.log(username);
        User.findOne({
            email : username
        }, async function (err, user) {
            console.log(user)
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("can not find user")
                return done(null, false, { message: 'Could not detect a user with that email.' });
            }
            var correctPassword = await user.passwordComparison(password);
            if (!correctPassword) {
                //not entering here for some reason despite passing false
                console.log("incorrect password")
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("success!")
            return done(null, user);
        });
    }
));

mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/yoverse", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("success, we connected to mongoose's database");
});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(expressValidator());

app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

//maybe
//Vue.config.productionTip = false;

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