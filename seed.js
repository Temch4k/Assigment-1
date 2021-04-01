"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/yoverse", {
    useNewUrlParser: true
  }
);
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

var user = [{
    name: {
      first: "Micah",
      last: "Stovall"
    },
    email: "micah.stovall@ucdenver.edu",
    birthday: (1998, 11, 2),
    biography: "Likes to be alive",
    gender: "Male",
    number: 00001
  },
  {
    name: {
      first: "Artsiom",
      last: "Skarakhod"
    },
    email: "artsiom.skarakhod@ucdenver.edu",
    birthday: (1999, 12, 8),
    biography: "Likes to touch soft fur",
    gender: "Male",
    number: 00002
  },
  {
    name: {
      first: "Dax",
      last: "Valdez"
    },
    email: "dax.valdez@ucdenver.edu",
    birthday: (1880, 1, 31),
    biography: "Likes to fly in the sky",
    gender: "Male",
    number: 00003
  },
  {
    name: {
      first: "Bob",
      last: "Bobberson"
    },
    email: "bobby@hotmail.com",
    birthday: (2001, 4, 15),
    biography: "Walks on lava",
    gender: "Male",
    number: 00004
  }
];



User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];



Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });