const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    bcrypt = require('bcrypt'),
    userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    birthday:{
        type:Date,
        required: true
    },
    numBiDay: {
        type:String
    },
    biography: {
        type: String,
        max: [500]
    },
    gender: {
        type: String,
    },
    number: {
        type: String,
    },
    securityQuestion1:{
        type: String
    },
    securityQuestion2:{
        type: String
    },
    securityQuestion3:{
        type: String
    },
    securityQuestion1Answer: {
        type: String
    },
    securityQuestion2Answer:{
        type: String
    },
    securityQuestion3Answer:{
        type: String
    },
    password: {
        type: String,
        min: [5],
        max: [20]
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    followPosts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    following: [{type: String, ref: "User"}],
    followers:[{type: String, ref: "User"}]
}, {
    timestamps: true
});

userSchema.methods.getInfo = function () {
    return `name ${this.name} username ${this.username} email ${this.email} birthday ${this.birthday} biography ${this.biography} number ${this.number} gender ${this.gender}`;
};

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next){
    let user = this;
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
    .catch(error => {
        console.log(`error in hashing password: ${error.message}`);
        next(error);
    });
});

userSchema.methods.passwordComparison = async function(inputPassword){
    let user = this;
    const valid = await bcrypt.compare(inputPassword, user.password);
    console.log("comparing passwords")
    return valid;
};

userSchema.methods.findLocalUser = function () {
    return this.model("User")
        .find({
            username: this.username
        })
        .exec();
}

module.exports = mongoose.model("User", userSchema);
