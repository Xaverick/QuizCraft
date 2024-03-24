const User = require('./models/userModel')
const jwt = require('jsonwebtoken');
const Admin = require('./models/adminModel');


module.exports.isClient = async  (req, res, next) => {   
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findById(decoded.userId);
        if(user) {
            req.userId = user._id;
            next();
        } 
        else res.status(400).json('invalid token');
    }
    else{
        res.status(400).json('no token');
    }
}


module.exports.isVerified = async (req, res, next) => {
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findById(decoded.id);
        if(user.verified) next();
        else res.status(400).json('not verified');
    }
    else{
        res.status(400).json('no token');
    }
}


module.exports.isAdmin = async (req, res, next) => {
    const token = req.signedCookies.jwt;
    console.log(token);
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const admin = await Admin.findById(decoded.adminId);
        console.log(admin);
        if(admin) {
            req.adminId = admin._id;
            next();
        }
       
        else {
            console.log('not admin');
            res.status(420).json('not admin');
        }
    }
    else{
        res.status(404).json('no token');
    }
}


