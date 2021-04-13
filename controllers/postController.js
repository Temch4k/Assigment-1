"use strict";

const Post = require("../models/post");

module.exports = {
    create: (req, res, next) => {
        let newPost = new Post({
            _user: req.body.title,
            description: req.body.description
        });
        post.create(newPost)
        .then( post => {
          res.locals.post = post;
          res.locals.redirect = "/posts";
          next();
        })
        .catch(error => {
          console.log(`Error saving post: ${error.message}`);
          next(error)
        })
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postsId)
        .then(() => {
          res.locals.redirect = "/posts";
          next();
        })
        .catch(error => {
          console.log(`Error fetching Post by ID: ${error.message}`);
        })
    }
}
