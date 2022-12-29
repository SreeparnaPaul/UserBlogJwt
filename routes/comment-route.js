const express = require("express");
const {getByBlogId,addComment, getCommentsByUserId, updateComment, deleteComment} = require("../controller /comment-controller");
const commentRouter=express.Router();
const { verifyToken,refreshToken } = require('../middileware/auth')

commentRouter.get("/:id",verifyToken,getByBlogId);
commentRouter.post("/add",verifyToken,addComment);
commentRouter.get("/user/:id",verifyToken,getCommentsByUserId);
commentRouter.put("/update/:id",verifyToken,updateComment);
// commentRouter.delete("/:id",verifyToken,deleteComment);


module.exports=commentRouter;