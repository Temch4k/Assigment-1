const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
    //friends: [{type: userSchema}]
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

userSchema.methods.findLocalUser = function () {
    return this.model("User")
        .find({
            username: this.username
        })
        .exec();
}

module.exports = mongoose.model("User", userSchema);