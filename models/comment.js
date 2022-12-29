const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "People",
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    required: true,
  }
});

module.exports = mongoose.model("Comment", commentSchema);