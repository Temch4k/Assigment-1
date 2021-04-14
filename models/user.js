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
    userName: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
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
    password: {
        type: String,
        min: [5],
        max: [20]
    }
}, {
    timestamps: true
});

userSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email} Birthday: ${this.birthday} Biography: ${this.biography} Number: ${this.number} Gender: ${this.gender}`;
};



userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.methods.findLocalUser = function () {
    return this.model("User")
        .find({
            zipCode: this.zipCode
        })
        .exec();
}

module.exports = mongoose.model("User", userSchema);