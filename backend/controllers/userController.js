const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const randomStringGenerator = require('randomstring');
const ExpressError = require('../utils/ExpressError');
const mailSender = require('../utils/mailSender');
const Profile = require('../models/profileModel');
const uploadOnCloudinary = require('../utils/cloudinary');
const cloudinary = require('cloudinary').v2;


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
            throw new ExpressError('invalid credentials password', 400);
        }
        const token = jwt.sign({ id: user._id }, process.env.USER_SECRET, { expiresIn: '3h'});
        res.cookie('userjwt', {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { signed: true, httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 3, secure: true })
        // res.cookie('userjwt', {token : token, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { signed: true, maxAge: 1000 * 60 * 60 * 3, httpOnly: true});    
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            googleId: user.googleId,
            profile: user.profile,      
            registeredQuizzes: user.registeredQuizzes      
        }
        console.log(payload);
        res.status(200).json({ payload, expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)});
    }
}

function generateUsername(fullName) {
    // Split the full name by spaces
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0];
    let randomNumber = Math.floor(1000 + Math.random() * 9000);
    let username = firstName + randomNumber;
    
    return username;
}

module.exports.register = async (req, res) => {
    let { name, email, password, referralcode } = req.body;
    if (!name || !email || !password) throw new ExpressError('missing fields', 400);
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({email: email});

    if (registeredEmail) {
        throw new ExpressError('email already registered', 400);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // checking for referral code from user
    const referralCode = referralcode;
    if(referralCode != ''){
        const referrerExists = await Profile.findOne({
            referralCodeString:referralCode
        });
        if(referrerExists){
            let userCountIncreased = 1;
            let coinsIncreased = 50;
            const referredUser = await Profile.findOneAndUpdate({referralCodeString:referralCode},
                {$inc :{totalUsersReferred:userCountIncreased, coin:coinsIncreased}},{new:true});
        }
    }

    // made changes to username, now its pretty much unique, name+[5]+"@Geeky"+[2], these are alot of combinations
    const username = generateUsername(name);
    const user = await User.create({ name,username, email, password: hash });
    
    //Creating Profile
    const referralCodeString = randomStringGenerator.generate(7).toUpperCase();
    const profile = await Profile.create({
        userId: user._id,
        referralCodeString:referralCodeString,
    });

    await profile.save();
    user.profile = profile._id;

    await user.save();
    // await sendVerificationEmail(email,user);
    res.status(200).json('register');

}


module.exports.logout = (req, res) => {
    console.log("In Logout");
    res.clearCookie('userjwt', {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.status(200).json('logout');
};


module.exports.profile = async (req, res) => {
    console.log('Inside profile');
    const user = await User.findById(req.userId);
    if (!user) {
        throw new ExpressError('user not found', 400);
    }
    const userDetails = await user.populate('profile');
    const userFullDetails = {
        name: user.name,
        username: user.username,
        rating:userDetails.profile.rating,
        text:userDetails.profile.bio,
        professions: userDetails.profile.professions,
        platformLink: userDetails.profile.platformLinks,
        occupation:userDetails.profile.occupation,
        phoneNo: userDetails.profile.phoneNumber,
        dob: userDetails.profile.dateOfBirth,
        profilePhoto: userDetails.profile.profilePhoto,
        bio : userDetails.profile.bio,
        referralCodeString: userDetails.profile.referralCodeString,
        country: user.country


    }

    res.status(200).json(userFullDetails);
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
            to: "kartikaggarwal2004@gmail.com",
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


const getCloudinaryPublicId = (url) => {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
};
  

module.exports.updateProfile = async (req, res) => {
    console.log('Inside updateProfile');
    const { username, name, bio, country, occupation, phoneNo, dob, tags , socialLinks } = req.body;
    // console.log(req.body);
    // Find the user by userId
    const user = await User.findById(req.userId);
    if (!user) {
      if (req.file?.path) fs.unlinkSync(req.file?.path);
      throw new ExpressError('User not found', 404);
    }
    // Update user fields
    if (user.username) {
      const usernameExists = await User.findOne({ username });

      if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
        if (req.file?.path) fs.unlinkSync(req.file?.path);
        throw new ExpressError('Username already exists', 400);
      }
      user.username = username;
    }
    
    // console.log("sfsfds", country);

    user.name = name;    
    user.country = country;


    // Update profile fields
    const profile = await Profile.findById(user.profile);

    if (!profile) {
      if (req.file?.path) fs.unlinkSync(req.file?.path);
      throw new ExpressError('Profile not found', 404);
    }

    let photo = req.file?.path;

    if (photo) {
        if (profile.profilePhoto) {
            const publicId = getCloudinaryPublicId(profile.profilePhoto);
            await cloudinary.uploader.destroy(publicId);
        }


        photo = await uploadOnCloudinary(photo);
        photo = photo.secure_url;
        profile.profilePhoto = photo;
        user.picture = photo;
    }

    profile.bio = bio;
    profile.occupation = occupation;
    profile.phoneNumber = phoneNo;
    profile.dateOfBirth = dob;
    profile.professions = tags ;
    profile.platformLinks = socialLinks;
    await user.save();
    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  
}
