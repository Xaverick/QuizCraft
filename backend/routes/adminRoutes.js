const router = require('express').Router();
const catchAsync = require('../utils/CatchAsync');
const admin = require('../controllers/adminController.js');
const {isAdmin} = require('../middleware.js');


router.route('/login')
    .post(catchAsync(admin.adminlogin));

router.route('/logout')
    .get(admin.adminlogout);

router.route('/register')
    .post(catchAsync(admin.adminregister));


router.route('/createquiz')
    .post(isAdmin, catchAsync(admin.createQuiz));



router.route('/updatequiz/:quizid')
    .put(isAdmin, catchAsync(admin.updateQuiz));

router.route('/deletequiz/:quizid')
    .delete(isAdmin, catchAsync(admin.deleteQuiz));

router.route('/createquestion/:quizid')
    .post(isAdmin, catchAsync(admin.createQuestion));

router.route('/updatequestion/:questionid')
    .post(isAdmin, catchAsync(admin.updateQuestion));

router.route('/deletequestion/:questionid')
    .delete(isAdmin, catchAsync(admin.deleteQuestion));


router.route('/getquizzes/:adminid')
    .get(isAdmin, catchAsync(admin.getQuizzes));


router.route('/getquiz/:quizid')
    .get(isAdmin, catchAsync(admin.getQuiz));

router.route('/getquestions/:quizid')
    .get(isAdmin, catchAsync(admin.getQuestions));

router.route('/getquestion/:questionId')
    .get(isAdmin, catchAsync(admin.getQuestionByQuestionId));


router.route('/compileResults/:quizid')
    .get(isAdmin, admin.compileResults);

module.exports = router;