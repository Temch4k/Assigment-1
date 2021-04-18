"use strict";

const Post = require("../models/post");
const user = require("../models/user");
const User = require("../models/user");



module.exports = {
    index: (req, res, next)=>{
        Post.find().sort({date:-1})
        .then(posts=>{
            res.locals.posts = posts;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching post data: ${error.message}`);
            next(error);
        });
    },
    indexByUsername: (req, res, next)=>{
        let user = req.params.username;
        Post.find({posterName: user}).sort({date:-1})
        .then(posts=>{
            res.locals.posts = posts;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching post data: ${error.message}`);
            next(error);
        });
    },
    indexView: (req, res) => {
        res.render("posts/index");
    },
    new: (req, res) => {
        this.res.render("/post/new");
    },
    create: (req, res, next) => {
        let user = req.params.id;
        let currentUserID = res.locals.currentUser._id;
        var username =res.locals.currentUser.username;
        var name = res.locals.currentUser.name.first + " "+res.locals.currentUser.name.last;

        let newPost = new Post({
            userID: user,    //needs to be adjusted for relational data
            postBody: req.body.postbody,
            posterName: username,
            fullName: name
        });
        if(currentUserID == user){
            Post.create(newPost)
                .then(p => {
                        // add post to user object
                        User.findByIdAndUpdate(user, { $push: { posts: p._id } })
                            .then(user => {
                                console.log("posted added");
                                res.locals.redirect = "/user/home";
                                next();
                            })
                        .catch(error => {
                            console.log(`Error fetching user by ID: ${error.message}`);
                            next(error);
                        })
                    })
                .catch(error => {
                    console.log(`Error saving post: ${error.message}`)
                    next(error)
        })
        }
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
                res.local.redirect = "/posts/${post._id}";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let postId = req.params.id;

        User.update({ $pull: {posts: req.params.id }});
        Post.findByIdAndRemove(postId)
        .then(() =>{
            res.locals.redirect = "/user/home";
            next();
        })
        .catch(error => {
            console.log(`Error fetching post by ID: ${error.message}`);
            next(error);
        });
    }
}