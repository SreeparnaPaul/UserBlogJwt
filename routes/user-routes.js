const express = require("express");
const {signup,login,getUser,logout,getAllUser}=require('../controller /user-controller')
const { verifyToken,refreshToken } = require('../middileware/auth')
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.get("/getAllUsers", getAllUser);
module.exports = router;