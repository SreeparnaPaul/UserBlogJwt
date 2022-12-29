const express = require("express");
const {getByBlogId} = require("../controller /comment-controller");
const commentRouter=express.Router();
const { verifyToken,refreshToken } = require('../middileware/auth')

commentRouter.get("/:id",verifyToken,getByBlogId);




module.exports=commentRouter;