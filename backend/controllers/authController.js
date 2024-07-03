const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel.js");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const randomStringGenerator = require('randomstring');
const Profile = require('../models/profileModel');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://api.geekclash.in/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
));

passport.serializeUser(function(user, callback) {
    callback(null, user._id);
});
  
passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
        callback(err, user);
    });
});


function generateUsername(fullName) {
  // Split the full name by spaces
  let nameParts = fullName.split(' ');
  let firstName = nameParts[0];
  let randomNumber = Math.floor(1000 + Math.random() * 9000);
  let username = firstName + randomNumber;
  
  return username;
}


module.exports.googleCallback = async (req, res) => {
    console.log("\n******** Inside handleGoogleLoginCallback function ********");
    // console.log("User Google Info", req.user);
    let existingUser = await User.findOne({ email: req.user._json.email });
    const redirectUrl = `${process.env.SITE_URL}/login`;
    
    if (existingUser) {
      if(!existingUser.googleId) {
        existingUser.googleId = req.user._json.sub;
        existingUser.picture = req.user._json.picture;
        await existingUser.save();
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.USER_SECRET, { expiresIn: '3h' });  
      res.cookie("userjwt", {token: token , expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge:3* 60 * 60 * 1000, secure: true, signed: true, sameSite: 'none' });
    
      return res.redirect(redirectUrl);
    }

    else{  
      console.log("Creating new Unregistered User");
      username = generateUsername(req.user._json.name);
      existingUser = await User.create({
        name: req.user._json.name,
        email: req.user._json.email,
        picture: req.user._json.picture,
        googleId: req.user._json.sub,
        verified: true,
        username: username,
      });

      const referralCodeString = randomStringGenerator.generate(7).toUpperCase();
      const profile = await Profile.create({
          userId: existingUser._id,
          referralCodeString:referralCodeString,
      });

      await profile.save();
      existingUser.profile = profile._id;
      await existingUser.save();
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.USER_SECRET, { expiresIn: '3h' });  
    res.cookie("userjwt", {token: token , expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000)}, { httpOnly: true, maxAge:3* 60 * 60 * 1000, secure: true, signed: true, sameSite: 'none' });
    return res.redirect(redirectUrl);

};

exports.getUserDetails = async (req, res) => {
    const user = await User.findById(req.userId);
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        googleId: user.googleId,
        profile: user.profile,
        registeredQuizzes: user.registeredQuizzes
        
    }
    res.status(200).json({payload: payload, expiresIn: req.expIn});
  
};

module.exports.logout = (req, res) => {
  res.clearCookie('userjwt', {
    signed: true,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  const redirectUrl = `${process.env.SITE_URL}/login`;
  res.redirect(redirectUrl);
}