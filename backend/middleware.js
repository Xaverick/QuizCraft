const User = require('./models/userModel')
const jwt = require('jsonwebtoken');
const Admin = require('./models/adminModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const isClient = async (req, res, next) => {
    const cookie = req.signedCookies.userjwt;

    if (!cookie) {
        return res.status(401).json("Not Logged In");
    }
    try {
        const token = cookie.token;
        const expiresIn = cookie.expiresIn;
        // console.log(token, expiresIn);
        const decoded = jwt.verify(token, process.env.USER_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("Unauthorized");
        }
        req.userId = user.id;
        req.expIn = expiresIn;
        next();
    }
    catch (e) {
        return res.status(401).json("Unauthorized");
    }
}


const isAdmin = async (req, res, next) => {
    const token = req.signedCookies.adminjwt;
    // console.log(token);
    if (!token) {
        return res.status(404).json('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
        if(!decoded) {
            return res.status(400).json('Invalid token');
        }
        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            return res.status(420).json('Not an admin');
        }
        req.adminId = admin._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 600 * 1024 }, // 600KB
  });

module.exports = { isAdmin, isClient, upload };
