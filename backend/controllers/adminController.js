const User = require('../models/adminModel');
const sendMail = require('../utils/mailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.adminlogin = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) res.status(400).json('missing fields');
    else{
        email = email.toLowerCase();
        const user = await User.findOne({ email: email});
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, `${process.env.SECRET}`, { expiresIn: '3h' });
            res.cookie('jwt', token, { signed: true,httpOnly: true ,maxAge: 1000 * 60 * 60 }).json('login');
        } 
        else {
            res.status(400).json('login failed');
        }
    }
}

module.exports.adminlogout = (req, res) => {
    res.clearCookie('jwt').json('logout');
};
