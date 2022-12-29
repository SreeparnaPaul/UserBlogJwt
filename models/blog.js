const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "People",
    required: true,
  },
  comments:[{
    type:mongoose.Types.ObjectId,
    ref:"Comment",
    required: true,
  }]
});

module.exports = mongoose.model("Blog", blogSchema);