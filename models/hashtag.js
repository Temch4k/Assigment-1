const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var hashtagSchema = new Schema({
    text: {type: String, require: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model("Hashtag", hashtagSchema);