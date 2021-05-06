const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports = (app) => {
  // VIEW ALL
  app.get("/", (req, res) => {
    var currentUser = req.user;
    Post.find({})
      .lean()
      .then((posts) => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // CREATE
  app.post("/new/post", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);

      post.save(function (err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
  // LOOK UP THE POST
  app.get("/posts/:id", function (req, res) {
    Post.findById(req.params.id)
      .lean()
      .populate("comments")
      .then((post) => {
        res.render("posts-show", { post });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // SUBREDDIT
  app.get("/n/:subreddit", function (req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .lean()
      .then((posts) => {
        res.render("posts-index", { posts });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
