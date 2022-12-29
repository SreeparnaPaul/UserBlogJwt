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

  const addComment = async (req, res, next) => {
    const { comment, user , blog } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    let existingBlog;
    try {
      existingBlog = await Blog.findById(blog);
    } catch (err) {
      return console.log(err);
    }
    if (!existingBlog) {
      return res.status(400).json({ message: "Unable TO FInd Blog By This ID" });
    }
    const newComment = new Comment({
      comment, user , blog
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await newComment.save({ session });
      existingBlog.comments.push(newComment);
      await existingBlog.save({ session });
      existingUser.comments.push(newComment);
      await existingUser.save({session});
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ newComment });
  };
  const getCommentsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userComments;
    try {
      userComments = await User.findById(userId).populate("comments");
    } catch (err) {
      return console.log(err);
    }
    if (!userComments) {
      return res.status(404).json({ message: "No Comments Found" });
    }
    return res.status(200).json({ user: userComments });
  };
  const updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const commentId = req.params.id;
    let updatedComment;
    try {
      updatedComment = await Comment.findByIdAndUpdate(commentId, {
        comment
      });
    } catch (err) {
      return console.log(err);
    }
    if (!updatedComment) {
      return res.status(500).json({ message: "Unable To Update The Comment" });
    }
    return res.status(200).json({ updatedComment });
  };
  // const deleteComment = async (req, res, next) => {
  //   const id = req.params.id;
  
  //   let blogComment;
  //   let userComment;
  //   try {
  //     userComment = await Comment.findByIdAndRemove(id).populate("user");
  //     await userComment.user.comments.pull(userComment);
  //     await userComment.user.save();
  //     blogComment = await Comment.findByIdAndRemove(id).populate("blog");
  //     await blogComment.blog.comments.pull(blogComment);
  //     await blogComment.blog.save();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   if (!userComment || !blogComment) {
  //     return res.status(500).json({ message: "Unable To Delete" });
  //   }
  //   return res.status(200).json({ message: "Successfully Delete" });
  // };
  
exports.getByBlogId=getByBlogId;
exports.addComment=addComment;
exports.getCommentsByUserId=getCommentsByUserId;
exports.updateComment=updateComment;
// exports.deleteComment=deleteComment;