
const router = require('express').Router();
const quiz  = require('../controllers/quizController.js');
const catchAsync = require('../utils/CatchAsync.js');
const { isClient } = require('../middleware.js');


router.route('/getAllQuizzes')
    .get(catchAsync(quiz.getAllQuizes));

router.route('/getQuiz/:quizid')
    .get(catchAsync(quiz.getQuiz));

router.route('/registerQuiz/:quizId')
    .post(isClient,catchAsync(quiz.registerQuiz));

router.route('/yourQuizzes')
    .get(isClient, catchAsync(quiz.getYourQuizzes));

router.route('/getQuestions/:quizid')
    .get(isClient, catchAsync(quiz.getQuestions));

router.route('/submitQuiz/:quizId')
    .post(isClient, catchAsync(quiz.addResponseAndUpdateSubmission));

router.route('/getSubmissions')
    .get(isClient,catchAsync(quiz.getSubmissions));

router.route('/getScore/:userid/:quizid')
    .get(isClient, catchAsync(quiz.getFinalScore));




router.route('/getQuizAnalytics/:quizid')
    .get(isClient, catchAsync(quiz.getQuizAnalytics));

router.route('/getWrongAnswers/:quizid')
    .get(isClient, quiz.getWrongAnswers);

router.route('/getLeaderboard/:quizid')
    .get(isClient, quiz.getLeaderboard);

module.exports = router;