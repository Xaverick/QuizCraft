const User = require('../models/adminModel');
const sendMail = require('../utils/mailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
require("dotenv").config()

module.exports.adminlogin = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body
    
        // Check if email or password is missing
        if (!email || !password) {
          // Return 400 Bad Request status code with error message
          return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
          })
        }
     
        // Find user with provided email
        const user = await User.findOne({ email });
    
        // If user not found with provided email
        if (!user) {
          // Return 401 Unauthorized status code with error message
          return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,
          })
        }
    
        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          )
    
          // Save token to user document in database
          user.token = token
          user.password = undefined
          // Set cookie for token and return success response
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          }
          res.cookie("token", {token,user}, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
          })
        } else {
          return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
          })
        }
      } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
          success: false,
          message: `Login Failure Please Try Again`,
          error:error
        })
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
    const { title, description, startTime, endTime, duration ,adminId} = req.body;

    if(!title || !description || !startTime || !endTime || !duration||!adminId){
        res.status(400).json('missing fields');
    } 
    else{
        const newQuiz = new Quiz({ title, description, startTime, endTime, duration, adminId});
        await newQuiz.save();
        res.json('quiz created');
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
    const quizzes = await Quiz.find({adminId: req.adminId});
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





module.exports.createQuestion = async (req, res) => {
    const {type, text, options, correctOption } = req.body;
    const quizId = req.params.quizid;

    if(!text || !type || !options || !correctOption){
        res.status(400).json('missing fields');
    } 
    else{
        const newQuestion = new Question({ type, text, options, correctOption, quizId});
        await newQuestion.save();
        res.json('question created');
    }
};

module.exports.updateQuestion = async (req, res) => {
    const {type, text, options, correctOption } = req.body;
    const questionId = req.params.questionid;

    if(!text || !type || !options || !correctOption){
        res.status(400).json('missing fields');
    } 
    else{
        await Question.findByIdAndUpdate(questionId, { type, text, options, correctOption});
        res.json('question updated');
    }
};


module.exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.questionid;
    await Question.findByIdAndDelete(questionId);
    res.json('question deleted');
}











