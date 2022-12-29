const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require('../models/comment');

const getByBlogId = async (req, res, next) => {
    const blogId = req.params.id;
    let blogComments;
    try {
        blogComments = await Blog.findById(blogId).populate("comments");
    } catch (err) {
      return console.log(err);
    }
    if (!blogComments) {
      return res.status(404).json({ message: "No Comments Found" });
    }
    return res.status(200).json({ blog: blogComments });
  };
exports.getByBlogId=getByBlogId;