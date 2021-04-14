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
    name: {
      first: "Micah",
      last: "Stovy",
    },
    userName:"micah.stovall@ucdenver.edu",
    email: "micah.stovall@ucdenver.edu",
    birthday: (1998, 11, 2),
    biography: "Likes to be alive",
    gender: "Male",
    number: 00001,
    password: "twiddledietwiddlo"
  },
  {
    name: {
      first: "Artsiom",
      last: "Skarakhod",
    },
    userName:"artsiom.skarakhod@ucdenver.edu",
    email: "artsiom.skarakhod@ucdenver.edu",
    birthday: (1999, 12, 8),
    biography: "Likes to touch soft fur",
    gender: "Male",
    number: 00002,
    password: "drowssap"
  },
  {
    name: {
      first: "Dax",
      last: "Valdez",
    },
    userName:"dax.valdez@ucdenver.edu",
    email: "dax.valdez@ucdenver.edu",
    birthday: (1880, 1, 31),
    biography: "Likes to fly in the sky",
    gender: "Male",
    number: 00003,
    password: "password"
  },
  {
    name: {
      first: "Bob",
      last: "Bobberson",
    }, 
    userName: "bobby@hotmail.com",
    email: "bobby@hotmail.com",
    birthday: (2001, 4, 15),
    biography: "Walks on lava",
    gender: "Male",
    number: 00004,
    password: "thisandthat"
  }
];

commands = []

users.forEach(c => {
  commands.push(
      user.save({
        name:{
          first: c.Fname,
          last: c.Lname
        },
        userName: c.userName,
        email: c.email,
        birthday: c.birthday,
        biography: c.biography,
        gender: c.gender,
        number: c.number,
        password: c.password
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