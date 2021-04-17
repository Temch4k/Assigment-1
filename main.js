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

router.use(expressValidator());

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



router.get("/", homeController.index);

// user routing
router.get("/user", userController.indexView);
router.get("/user/login", userController.login);
router.post("/user/login", userController.authenticate);
router.get("/user/logout", userController.logout, userController.redirectView);



router.get("/user/signup", userController.new);
router.post("/user/create", userController.validate, userController.create, userController.redirectView);
router.get("/user/forgotPassword", userController.forgotPassword);
router.get("/user/home", postController.index, userController.showHome);
router.get("/user/profilePage", userController.showProfileSettings);
router.get("/user/:username/Profile", userController.show, postController.indexByUsername, userController.showProfile);
router.post("/post/:id/create", postController.create, userController.redirectView);

// home routing
router.get("/user/securityQuestions", userController.showSecQuestions);

// still need login procedure

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

// user post


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

// router.route('/moviecollection/:movieid')
//     .get(authJwtController.isAuthenticated, function (req, res) {
//         // find the movie using the request title
//         // .select is there to tell us what will be returned
//         if(req.query == null || req.query.review !== "true"){
//             Movie.findOne({_id: req.params.movieid}).select("title year genre actors").exec(function (err, movie) {
//                 // if we have an error then we display it
//                 if(err) 
//                 {
//                     return res.status(401).json({message: "Something is wrong: \n", error: err});
//                 }
//                 // otherwise just show the movie that was returned
//                 else if(movie == null)
//                 {
//                     return res.status(404).json({success: false, message: "Error: movies not found."});
//                 }
//                 else
//                 {
//                     return res.status(200).json(movie);
//                 }
//             })
//         }
//         else 
//         {
//             Movie.aggregate()
//             .match({_id: mongoose.Types.ObjectId(req.params.movieid)})
//             .lookup({from: 'reviews', localField: '_id', foreignField: 'movieid', as: 'reviews'})
//             .exec(function (err, movie) {
//                 if (err)
//                 {
//                     return res.send(err);
//                 }
//                 // find average reviews four our movies
//                 var numOfMovies = movie.length;
//                 if (movie && numOfMovies > 0) 
//                 {
//                     // add all of the average values together
//                     for (let i = 0; i < numOfMovies; i++) 
//                     {
//                         let sum = 0;
//                         // go through all of the review values and add them
//                         for (let k = 0; k < movie[i].reviews.length; k++) 
//                         {
//                             sum = sum + movie[i].reviews[k].rating;
//                         }
//                         // adds the avg review to the movie
//                         if (movie[i].reviews.length > 0) 
//                         {
//                             movie[i] = Object.assign({},movie[i],{avgRating: (sum/movie[i].reviews.length).toFixed(2)});
//                         }
//                     }
//                     movie.sort((a,b) => {
//                         return b.avgRating - a.avgRating;
//                 });
//                 return res.status(200).json({
//                     result: movie
//                 });
//             }
//                 else {
//                     return res.status(404).json({success: false, message: "Not found."});
//                 }
//             });
//         }
//     })

function checkPassword(inputText) {
    var passw = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputText.value.match(passw)) {
        return true;
    } else {
        return false;
    }
}