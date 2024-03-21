const router = require('express').Router();
const user  = require('../controllers/userController');
const catchAsync = require('../utils/CatchAsync');
const { isLoggedIn, isClient } = require('../middleware.js');


router.route('/login')
    .post(catchAsync(user.login));
    
    
router.route('/register')
    .post(catchAsync(user.register));

// router.route('/sendverificationEmail/:userid')
//     .post(catchAsync(user.sendUserVerificationEmail));

// router.route('/verifyEmail/:userid/:token')
//     .get(catchAsync(user.verifyUser));


router.route('/logout')
    .get(isClient,catchAsync(user.logout));


router.route('/forgotpassword')
    .post(catchAsync(user.forgotPassword));


router.route('/resetpassword/:id/:token')
    .post(catchAsync(user.resetPassword));


router.route('/profile')
    .get(isClient,catchAsync(user.profile));

router.route('/updateprofile')
    .post(isClient,catchAsync(user.updateProfile));

router.route('/getAllQuizzes')
    .get(isClient,catchAsync(user.getAllQuizes));

router.route('/getQuiz/:quizid')
    .get(isClient,catchAsync(user.getQuiz));

router.route('/getQuestions/:quizid')
    .get(isClient,catchAsync(user.getQuestions));

router.route('/submitQuiz/:quizid')
    .post(isClient,catchAsync(user.addResponseAndUpdateSubmission));

router.route('/getSubmissions')
    .get(isClient,catchAsync(user.getSubmissions));

router.route('/getScore/:userid/:quizid')
    .get(isClient,catchAsync(user.getFinalScore));


module.exports = router;