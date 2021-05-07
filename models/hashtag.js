const mongoose = require("mongoose");
const Post = require("./post");
var Schema = mongoose.Schema;


const hashtagSchema = new Schema({
    text: {type: String, require: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: Post}]
});

module.exports = mongoose.model("Hashtag", hashtagSchema);