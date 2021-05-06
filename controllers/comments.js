const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

module.exports = (app) => {
  // CREATE Comment
  app.post("/posts/:postId/comments", function (req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    if (req.user) {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      // SAVE INSTANCE OF Comment MODEL TO DB
      comment
        .save()
        .then((comment) => {
          return Post.findById(req.params.postId);
        })
        .then((post) => {
          post.comments.unshift(comment);
          return post.save();
        })
        .then((post) => {
          res.redirect(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
};
