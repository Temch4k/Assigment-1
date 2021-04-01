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

var users = [{
    Fname: "Micah",
    Lname: "Stovy",
    email: "micah.stovall@ucdenver.edu",
    birthday: (1998, 11, 2),
    biography: "Likes to be alive",
    gender: "Male",
    number: 00001
  },
  {
    Fname: "Artsiome",
    Lname: "Skarakhod",
    email: "artsiom.skarakhod@ucdenver.edu",
    birthday: (1999, 12, 8),
    biography: "Likes to touch soft fur",
    gender: "Male",
    number: 00002
  },
  {
    Fname: "Dax",
    Lname: "Valdez",
    email: "dax.valdez@ucdenver.edu",
    birthday: (1880, 1, 31),
    biography: "Likes to fly in the sky",
    gender: "Male",
    number: 00003
  },
  {
    Fname: "Bob",
    Lname: "Bobberson",
    email: "bobby@hotmail.com",
    birthday: (2001, 4, 15),
    biography: "Walks on lava",
    gender: "Male",
    number: 00004
  }
];

commands = []

users.forEach(c => {
  commands.push(
      User.create({
          firstName: c.firstName,
          lastName: c.lastName,
          dateOfBirth: c.dateOfBirth,
          userName: c.userName,
          email: c.email,
          password: c.password,
          securityQuestion: c.securityQuestion,
          securityAnswer: c.securityAnswer,
          gender: c.gender,
          description: c.description
      })
  );
});


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