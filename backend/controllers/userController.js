const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const ExpressError = require('../utils/ExpressError');
const mailSender = require('../utils/mailSender');

module.exports.login = async (req, res) => {
    console.log("Inside login");
    let { email, password } = req.body;
    if (!email || !password) throw new ExpressError('missing fields', 400);
    else {
        email = email.toLowerCase();
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new ExpressError('invalid credentials', 400);
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new ExpressError('invalid credentials', 400);
        }
        const payload = { userId: user._id, email: user.email, name: user.name };
        const token = jwt.sign(payload, `${process.env.USER_SECRET}`, { expiresIn: '3h' });
        res.cookie('userjwt', token, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 3 * 1000 * 60 * 60, secure: true })
        res.status(200).json({ payload, expiresIn: 3 * 1000 * 60 * 60 });
    }
}


module.exports.register = async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) throw new ExpressError('missing fields', 400);
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({ email: email, name: name });

    if (registeredEmail) {
        throw new ExpressError('email or username already registered', 400);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, email, password: hash });
    // await sendVerificationEmail(email,user);
    res.status(200).json('register');


}

module.exports.logout = (req, res) => {
    res.clearCookie('userjwt').json('logout');
};


module.exports.profile = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        throw new ExpressError('user not found', 400);
    }

    res.status(200).json(user);
}


module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const secret = `${process.env.USER_SECRET}${user.password}`;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '5m' });

        let config = {
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASSWORD}`
            }
        };
        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'MyApp',
                link: 'https://mailgen.js/'
            }

        });

        var response = {
            body: {
                name: 'John Appleseed',
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Click here',
                        link: `${process.env.BACKEND_DOMAIN}/user/resetpassword/${user._id}/${token}`
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        var emailBody = MailGenerator.generate(response);
        let message = {
            from: `${process.env.EMAIL}`,
            to: `${email}`,
            subject: 'Password Reset Request',
            html: emailBody
        };

        transporter.sendMail(message)
            .then(() => res.status(201).json('email sent'))
            .catch((err) => res.status(400).json(err));

    }
    else {
        res.status(400).json('email not registered');
    }
}



module.exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findById(id);
    const redirectUrl = process.env.NODE_ENV === 'production' ? `${process.env.SITE_URL}/login` : 'http://localhost:5173/login';
    if(!oldUser){
        res.status(400).json('user not found');
    }
    else{
        const secret = `${process.env.USER_SECRET}${oldUser.password}`;
        if(jwt.verify(token,secret)){
            oldUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            await oldUser.save();
            res.render('successfulReset.ejs', {redirectUrl});
        }
        else{
            res.status(400).json('invalid token');
        }
    }
}

module.exports.contactUs = async (req, res) => {
    const { firstName, lastName, email,phoneNumber, subject, message } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !subject || !message) {
        throw new ExpressError('missing fields', 400);
    }
    const emailBody = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;
    mailSender(email, subject, emailBody);
    res.status(200).json('contact us');
}
