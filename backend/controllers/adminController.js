const User = require('../models/adminModel');
const sendMail = require('../utils/mailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');

module.exports.adminlogin = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) res.status(400).json('missing fields');
    else{
        email = email.toLowerCase();
        const user = await User.findOne({ email: email});
        if(user && bcrypt.compareSync(password, user.password)) {
            const payload = { adminId: user._id, email: user.email, username: user.username };
            const token = jwt.sign( payload, `${process.env.SECRET}`, { expiresIn: '1h' });
            res.cookie('jwt', token, { signed: true,httpOnly: false, sameSite: 'none', maxAge: 1000 * 60 * 60,secure: true })
            res.status(200).json({token, user: user._id});
          

        } 
        else {
            res.status(600).json('login failed');
        }
    }
}

module.exports.adminlogout = (req, res) => {
    res.clearCookie('jwt').json('logout');
};

module.exports.adminregister = async (req, res) => {
    let { username, email, password } = req.body;
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({email: email});

    if(registeredEmail){
        res.status(400).json('email already exists');
    }

    else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await User.create({username, email, password: hash});
        res.json('register');
    }
}


module.exports.createQuiz = async (req, res) => {
    // console.log(req.body);
    const { title, description, startTime, endTime, duration } = req.body;

    if (!title || !description || !startTime || !endTime || !duration) {
        res.status(500).json('missing fields');
    } else {
        const newQuiz = new Quiz({ title, description, startTime, endTime, duration, adminId: req.adminId });
        const savedQuiz = await newQuiz.save();
        res.json({ message: 'quiz created', quizId: savedQuiz._id });
    }
}


module.exports.updateQuiz = async (req, res) => {
    const { title, description, startTime, endTime, duration } = req.body;
    const quizId = req.params.quizid;

    if(!title || !description || !startTime || !endTime || !duration){
        res.status(400).json('missing fields');
    } 
    else{
        await Quiz.findByIdAndUpdate(quizId, { title, description, startTime, endTime, duration});
        res.json('quiz updated');
    }
};

module.exports.deleteQuiz = async (req, res) => {
    const quizId = req.params.quizid;
    await Quiz.findByIdAndDelete(quizId);
    res.json('quiz deleted');
};

module.exports.getQuizzes = async (req, res) => {
    const adminId = req.params.adminid;
    const quizzes = await Quiz.find({adminId: adminId});
    res.json(quizzes);
};


module.exports.getQuiz = async (req, res) => {
    const quizId = req.params.quizid;
    const quiz = await Quiz.findById(quizId);   
    res.json(quiz);
}

module.exports.getQuestions = async (req, res) => {
    const quizId = req.params.quizid;
    const questions = await Question.find({quizId: quizId});
    res.json(questions);

}

module.exports.getQuestionByQuestionId = async (req, res) => {
    const questionId = req.params.questionId;
    console.log(questionId);
    const question=await Question.findById(questionId);
    res.json(question);
}



module.exports.createQuestion = async (req, res) => {
    const { type, text, options, correctOption } = req.body;
    const quizId = req.params.quizid;

    if (!text || !type || !correctOption) {
        res.status(400).json('missing fields');

    } else {
        try {
            const newQuestion = new Question({ type, text, options, correctOption, quizId });
            const savedQuestion = await newQuestion.save();

            // Find the quiz by ID and update its questions array
            const quiz = await Quiz.findByIdAndUpdate(
                quizId,
                { $push: { questions: savedQuestion._id } },
                { new: true }
            );

            if (!quiz) {
                res.status(404).json('Quiz not found');
            } else {
                res.json({ message: 'question created', questionId: savedQuestion._id });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports.updateQuestion = async (req, res) => {
    const {type, text, options, correctOption } = req.body;
    const questionId = req.params.questionid;

    if(!text || !type || !correctOption){
        res.status(400).json('missing fields');
    } 
    else{
        await Question.findByIdAndUpdate(questionId, { type, text, options, correctOption});
        res.json('question updated');
    }
};


module.exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.questionid;

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    // Remove the question ID from the Quiz array of questions
    await Quiz.updateMany(
        { },
        { $pull: { questions: questionId } },
        { multi: true }
    );

    res.json('Question deleted and removed from Quiz');
}












