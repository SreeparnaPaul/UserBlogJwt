const express = require("express");
const {getByBlogId,addComment, getCommentsByUserId} = require("../controller /comment-controller");
const commentRouter=express.Router();
const { verifyToken,refreshToken } = require('../middileware/auth')

commentRouter.get("/:id",verifyToken,getByBlogId);
commentRouter.post("/add",verifyToken,addComment);
commentRouter.get("/user/:id",verifyToken,getCommentsByUserId);



module.exports=commentRouter;