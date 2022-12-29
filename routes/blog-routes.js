const express = require("express");
const {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
} =require('../controller /blog-controller')
const { verifyToken,refreshToken } = require('../middileware/auth')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const blogRouter = express.Router();

blogRouter.get("/",verifyToken, getAllBlogs);
blogRouter.post("/add",upload.single('image'), addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id",verifyToken, getByUserId);

module.exports = blogRouter;