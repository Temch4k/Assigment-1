"use strict";

const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");
const hashtag = require("../models/hashtag");



module.exports = {
    index: (req, res, next) => {
        Post.find().sort({
                date: -1
            })
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
                console.log(`Error fetching post data: ${error.message}`);
                next(error);
            });
    },
    indexByUsername: (req, res, next) => {
        let user = req.params.username;
        Post.find({
                posterName: user
            }).sort({
                date: -1
            })
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
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
        var username = res.locals.currentUser.username;
        var name = res.locals.currentUser.name.first + " " + res.locals.currentUser.name.last;

        let newPost = new Post({
            userID: user, //needs to be adjusted for relational data
            postBody: req.body.postbody,
            posterName: username,
            fullName: name
        });
        if (currentUserID == user) {
            Post.create(newPost)
                .then(p => {
                    // add post to user object
                    User.findByIdAndUpdate(user, {
                            $push: {
                                posts: p._id
                            }
                        })
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
            addPostToHashtagDB(newPost);
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
    findtrendingtags: async (req, res, next) => {
        var collection = await Hashtag.aggregate([
            { $unwind : "$posts" },
            { $group : { _id : "$text", length : { $sum : 1 } } },
            { $sort : { length : -1 } },
            { $limit : 5 }
        ], async function (err, docs) {
            console.log(docs)
            res.locals.trendingtags = docs;
            next();
        });
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
        let updatedpost = new post({});

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
        User.update({
            username: res.locals.currentUser.username
        }, {
            $pull: {
                posts: req.params.id
            }
        });
        Post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/user/home";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            });
    },
}

// scans for '#' symbol and adds to hashtag posts array
async function addPostToHashtagDB(post) {
    // find all hashtag in the post and update DB
    let hashtagList = postFilter('#', post.postBody);
    if (hashtagList.length != 0) {
        for (let i = 0; i < hashtagList.length; i++) {
            console.log(hashtagList[i]);
            Hashtag.findOne({
                    text: hashtagList[i]
                })
                .then((hashtag1) => {
                    if (hashtag1 == null) {
                        console.log(hashtagList[i]);
                        let newHash = new Hashtag({
                            text: hashtagList[i], //needs to be adjusted for relational data
                            posts: [post._id]
                        });
                        console.log(newHash);
                        Hashtag.create(newHash);
                    } else {
                        Hashtag.findByIdAndUpdate({
                                _id: hashtag1._id
                            }, {
                                $push: {
                                    posts: hashtag1
                                }
                            })
                            .catch(error => {
                                console.log(`Error adding hashtag to array: ${error.message}`);
                            });
                    }
                })
                .catch(error => {
                    console.log(`Error adding hashtag to database: ${error.message}`);
                    // next(error);
                });
        }
    }
}

function postFilter(character, post) {
    var startIndex = 0,
        index;
    var textList = [];
    while ((index = post.indexOf(character, startIndex)) > -1) {
        var indexOfSpace = post.indexOf(" ", index + 1);
        if (indexOfSpace == -1) {
            indexOfSpace = post.length;
        }
        var textSubstring = post.substring(index + 1, indexOfSpace);
        textList.push(textSubstring);
        startIndex = index + 1;
    }
    return textList;
}