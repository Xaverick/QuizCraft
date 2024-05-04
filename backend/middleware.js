const User = require('./models/userModel')
const jwt = require('jsonwebtoken');
const Admin = require('./models/adminModel');


module.exports.isClient = async (req, res, next) => {
    const token = req.signedCookies.userjwt;
    if (!token) {
        return res.status(400).json('Please log in first');
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_SECRET);
        if(!decoded) {
            return res.status(400).json('Invalid token');
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json('Invalid token');
        }
        req.userId = user._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
}


module.exports.isAdmin = async (req, res, next) => {
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
