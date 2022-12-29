const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const blogRouter =require('./routes/blog-routes');
const commentRouter = require("./routes/comment-route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./database/connection.js");
const app = express();
const PORT= process.env.PORT;
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/blog", blogRouter);
app.use("/api/comment",commentRouter);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
