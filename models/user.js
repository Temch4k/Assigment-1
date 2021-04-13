const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
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
        birthday: {
            type: Date,
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
    });

    userSchema.methods.getInfo = function () {
        return `Name: ${this.name} Email: ${this.email} Birthday: ${this.birthday} Biography: ${this.biography} Number: ${this.number} Gender: ${this.gender}`;
    };

    userSchema.methods.findLocalSubscribers = function () {
        return this.model("Subscriber")
            .find({
                zipCode: this.zipCode
            })
            .exec();
    }

module.exports = mongoose.model("User", userSchema);
