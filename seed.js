
const mongoose = require("mongoose"),
  Post = require("./models/post")
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/yoverse", 
  {useNewUrlParser: true}
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
    username:"stovy",
    email: "micah.stovall@ucdenver.edu",
    birthday: (1998, 11, 2),
    numBiDay: "1998-11-2",
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
    username:"artemio",
    email: "artsiom.skarakhod@ucdenver.edu",
    birthday: (2000, 3, 12),
    numBiDay: "2000-3-12",
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
    username:"dreams",
    email: "dax.valdez@ucdenver.edu",
    birthday: (1880, 1, 31),
    numBiDay: "1880-1-31",
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
    username: "bobster23",
    email: "bobby@hotmail.com",
    birthday: (2001, 4, 15),
    numBiDay: "2001-4-15",
    biography: "Walks on lava",
    gender: "Male",
    number: 00004,
    password: "thisandthat"
  }
];

var post = [
  {
  _user: "bobby@hotmail.com",
  postBody: "I just walked on lava again!"
  },
  {
    _user: "dax.valdez@ucdenver.edu",
    postBody: "Woo Hoo! Just won the soccer game today"
  },
  {
    _user: "micah.stovall@ucdenver.edu",
    postBody: "I ate the biggest burrito ever last night!"
  },
  {
    _user: "artsiom.skarakhod@ucdenver.edu",
    postBody: "Was out on a walk and spotted a barn owl. Neat!"
  }
];

commands = [];

// users.forEach(c => {
//   commands.push(
//       User.create({
//         name:{
//           first: c.first,
//           last: c.last
//         },
//         username: c.username,
//         email: c.email,
//         birthday: c.birthday,
//         biography: c.biography,
//         gender: c.gender,
//         number: c.number,
//         password: c.password,
//         post: c.post
//       })
//   );
// });

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];

users.forEach(c => {
  let newUser = new User(c);
  commands.push(
      User.register(newUser, c.password)
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });