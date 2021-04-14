"use strict";

const Post = require("../models/post");

module.exports = {
    index: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.locals.post = posts;
                next()
            })
            .catch(error => {
                console.log(`Error fetching post data: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("posts/index");
    },
    new: (req, res) => {
        this.res.render("/post/new");
    },
    create: (req, res, next) => {
        let newPost = new post({
            userId: req.body.userId, //needs to be adjusted for relational data
            postMessage: req.body.postMessage
        });
        post.create(newpost)
            .then(post => {
                res.locals.post = post;
                res.locals.redirect = "/post";
                next();
            })
            .catch(error => {
                console.log(`Error saving post: ${error.message}`)
                next(error)
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let postId = req.params.id;
        post.findById(postId)
            .then(post => {
                res.locals.post = post;
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
            })
    },
    showView: (req, res) => {
        res.render(posts / show)
    },
    edit: (req, res, next) => {
        let post = req.params.id;
        post.findById(postId)
            .then(post => {
                res.render("/posts/edit", {
                    post: post
                });
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`)
            })
    },
    update: (req, res, next) => {
        let postId = req.params.id;
        let updatedpost = new post({

        });

        post.findByIdAndUpdate(postId, updatedpost)
            .then(post => {
                res.locals.post = post;
                res.local.redirect = "/posts/${post._id";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/postId";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            });
    }
}