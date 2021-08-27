const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post most have title"],
  },
  body: {
    type: String,
    required: [true, "Post most have body"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
