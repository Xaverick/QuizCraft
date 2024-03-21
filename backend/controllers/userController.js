const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
const Submission  = require('../models/submissions');

module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) res.status(400).json('missing fields');
    else{
        email = email.toLowerCase();
        const user = await User.findOne({ email: email});
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username, email: user.email}, `${process.env.SECRET}`, { expiresIn: '1h' });
            
            res.cookie('jwt', token, { signed: true,httpOnly: false, sameSite: 'none', maxAge: 1000 * 60 * 60,secure: true }).json('login');
        } 
        else {
            res.status(400).json('login failed');
        }
    }
}


module.exports.register = async (req, res) => {
    let { name, username, email, password } = req.body;
    if(!name || !username || !email || !password) res.status(400).json('missing fields'
    );
    email = email.toLowerCase();
    const registeredEmail = await User.findOne({email: email, username: username});

    if(registeredEmail){
        res.status(400).json('email already exists');
    }

    else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await User.create({name, username, email, password: hash});
        // await sendVerificationEmail(email,user);
        res.json('register');
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('jwt').json('logout');
};


module.exports.profile = async (req, res) => {
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findById(decoded.id);
        res.json(user);
    }
    else{
        res.status(400).json('no token');
    }
}


module.exports.forgotPassword = async (req, res) => {
    const { email} = req.body;
    const user = await User.findOne({email: email});
    if(user){
        const secret = `${process.env.SECRET}${user.password}`;
        const token = jwt.sign({ id: user._id } , secret , { expiresIn: '5m' });

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
    else{
        res.status(400).json('email not registered');
    }
}


module.exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findById(id);
    if(!oldUser){
        res.status(400).json('user not found');
    }
    else{
        const secret = `${process.env.SECRET}${oldUser.password}`;
        if(jwt.verify(token,secret)){
            oldUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            await oldUser.save();
            res.json('password changed');
        }
        else{
            res.status(400).json('invalid token');
        }
    }

}

module.exports.getAllQuizes= async (req, res) => {
    const quizes = await Quiz.find();
    res.json(quizes);
}

module.exports.getQuiz = async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizid);
    res.json(quiz);
}

module.exports.addResponseAndUpdateSubmission = async (req, res) => {
    const { userId, quizId, answers } = req.body;
    if(!userId || !quizId ) {
      return res.status(400).json('Invalid request Give full parameters');
    }
    // Fetch questions to validate questionIds and check correctness of answers
    const questions = await Question.find({ _id: { $in: answers.map(ans => ans.questionId) } });
  
    // Calculate score and update isCorrect for each answer
    let score = 0;
    const updatedAnswers = answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId.toString());
      if (!question) {
        return { ...answer, isCorrect: false }; // Question not found, mark as incorrect
      }
      const isCorrect = question.correctOption === answer.response; // Assuming correctOption is the correct answer
      if (isCorrect) {
        score++;
      }
      return { ...answer, isCorrect };
    });
  
    // Create or update submission
    const submission = await Submission.findOneAndUpdate(
      { userId, quizId },
      { $set: { answers: updatedAnswers, score } },
      { new: true, upsert: true }
    );
  
    res.status(200).json({ submission });
  };
  
  module.exports.getFinalScore = async (req, res) => {
    const { userId, quizId } = req.params;
    if (!userId || !quizId) {
      return res.status(400).json('Invalid request Give full parameters');
    }
    const submission = await Submission.findOne({ userId, quizId });
    if (!submission) {
      return res.status(404).json('No submission found');
    }
    res.status(200).json({ score: submission.score });
  }
  
  module.exports.getQuestions = async (req, res) => {
    const questions = await Question.find({ quizId: req.params.quizid });
    res.status(200).json({ questions });
  }

  module.exports.getSubmissions = async (req, res) => {
    const submissions = await Submission.find({ userId: req.userId });
    res.status(200).json({ submissions });
  }
