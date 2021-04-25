
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
    number: "720-123-2222",
    password: "twiddledietwiddlo",
    securityQuestion1: "In what town or city did you meet your spouse or partner?",
    securityQuestion2: "What was the house number and street name you lived in as a child?",
    securityQuestion3: "What is your spouse or partner's mother's maiden name?",
    securityQuestion1Answer: "abc",
    securityQuestion2Answer: "abc",
    securityQuestion3Answer: "abc"
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
    number: "123-333-2222",
    password: "art",
    securityQuestion1: "In what town or city did you meet your spouse or partner?",
    securityQuestion2: "What was the house number and street name you lived in as a child?",
    securityQuestion3: "What is your spouse or partner's mother's maiden name?",
    securityQuestion1Answer: "abc",
    securityQuestion2Answer: "abc",
    securityQuestion3Answer: "abc"
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
    number: "123-333-2227",
    password: "password",
    securityQuestion1: "In what town or city did you meet your spouse or partner?",
    securityQuestion2: "What was the house number and street name you lived in as a child?",
    securityQuestion3: "What is your spouse or partner's mother's maiden name?",
    securityQuestion1Answer: "abc",
    securityQuestion2Answer: "abc",
    securityQuestion3Answer: "abc"
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
    number: "000-123-3344",
    password: "thisandthat",
    securityQuestion1: "In what town or city did you meet your spouse or partner?",
    securityQuestion2: "What was the house number and street name you lived in as a child?",
    securityQuestion3: "What is your spouse or partner's mother's maiden name?",
    securityQuestion1Answer: "abc",
    securityQuestion2Answer: "abc",
    securityQuestion3Answer: "abc"
  }
];

var posts = [
  {
  _user: "dreams",
  postBody: "I just walked on lava again!",
  fullName: "Dax Valdez"
  },
  {
    _user: "dreams",
    postBody: "Woo Hoo! Just won the soccer game today",
    fullName: "Dax Valdez"
  },
  {
    _user: "stovy",
    postBody: "I ate the biggest burrito ever last night!",
    fullName: "Micah Stovall"
  },
  {
    _user: "artemio",
    postBody: "Was out on a walk and spotted a barn owl. Neat!",
    fullName: "Artsiom Skarakhod"
  }
];

commands = [];


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

posts.forEach(c => {
  let newPost = new Post(c);
      Post.insert(newPost)
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });