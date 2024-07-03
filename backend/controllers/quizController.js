const User = require('../models/userModel');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
const Submission  = require('../models/submissions');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const jwt = require('jsonwebtoken');
const Leaderboard = require('../models/leaderboard');
const ExpressError = require('../utils/ExpressError');



const sendVerificationEmail = async (email,user) => {
  const secret = process.env.SECRET;
  const token = jwt.sign({ id: User._id } , secret , { expiresIn: '120m' });

  let config = {
    host: 'smtp.hostinger.com', // Hostinger SMTP server
    port: 465, // Port for secure SMTP
    secure: true, // True for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Hostinger email user
        pass: process.env.PASSWORD // Hostinger email password
    }
  };
  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
          name: 'Geek Clash',
          link: 'https://mailgen.js/'
      }

  });

  var response = {
      body: {
          name: `${user.username}`,
          intro: 'this is for the verification of the email you have provided',
          action: {
              instructions: 'Click the button below to verify the email:',
              button: {
                  color: '#DC4D2F',
                  text: 'Click here',
                  link: `${process.env.BACKEND_DOMAIN}/user/verifyEmail/${user._id}/${token}`
              }
          },
          outro: 'If you did not request a verification email, no further action is required on your part.'
      }
  };

  var emailBody = MailGenerator.generate(response);
  let message = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: 'Email Verification',
      html: emailBody
  };

  transporter.sendMail(message)
  .then(() => console.log('email sent'))
  .catch((err) => console.log(err));        
}


module.exports.getAllQuizes= async (req, res) => {
    const quizes = await Quiz.find();
    latestQuiz = quizes.map(quiz => {
       return quiz.startTime > (Date.now());
    })
    res.json(quizes);
}

module.exports.getQuiz = async (req, res) => {
  try {
      const quiz = await Quiz.findById(req.params.quizid);
      if (!quiz) {
          throw new ExpressError('Quiz not found', 400);
      }

      const quizId = req.params.quizid;
      const userId = req.userId;
      const userSubmission = await Submission.findOne({ quizId: quizId, userId: userId });
      const allUserSubmissions = await Submission.find({ quizId: quizId });


      // Sort all submissions by score in descending order
      allUserSubmissions.sort((a, b) => b.score - a.score);

      // Find the rank of the current user
      const userRank = allUserSubmissions.findIndex(submission => submission.userId.toString() === userId.toString()) + 1;

      // Calculate the percentage of users that the current user beat
      const beatPercentage = ((allUserSubmissions.length - userRank) / allUserSubmissions.length) * 100;
      console.log(allUserSubmissions.length,userRank)
      console.log({
        quiz: quiz,
        response: userSubmission,
        message: `You beat ${beatPercentage.toFixed(0)}% in this contest`
    })
      res.json({
          quiz: quiz,
          response: userSubmission,
          message: `You beat ${beatPercentage.toFixed(2)}% in this contest`
      });
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
  }
}



module.exports.registerQuiz = async (req, res) => {
  const { quizId } = req.params;
  const userId = req.userId;
  if (!userId && !quizId) {
      throw new ExpressError('quizId or userId not provided', 400);
  }

  const user = await User.findById(userId);
  if (!user) {
      throw new ExpressError('user not found', 400);
  }
  
  if (!user.verified) {
      await sendVerificationEmail(user.email, user);
      throw new ExpressError('User not verified. Verification email sent', 400);
  }

  if (user.registeredQuizzes.includes(quizId)) {
      throw new ExpressError('You have already registered for this quiz', 400);
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
      throw new ExpressError('quiz not found', 400);
  }

  if (Date.now() > quiz.startTime) {
      throw new ExpressError('Contest has started. No registration allowed', 400);
  }

  user.registeredQuizzes.push(quizId);
  await user.save();
  quiz.totalRegistered++;

  // Add user profile picture to the quiz if it exists
  if (user.picture) {
      if (quiz.User_profile_Image.length < 3) {
          quiz.User_profile_Image.push(user.picture);
      } else if (quiz.User_profile_Image.length == 3) {
          quiz.User_profile_Image.shift();
          quiz.User_profile_Image.push(user.picture);
      }
  }

  await quiz.save();
  
  res.status(200).json('Contest registered');
}

module.exports.isRegistered = async (req,res) => {
    const userId = req.userId;
    const { quizId } = req.params;
    const user = await User.findById(userId);
    if(!user) {
        throw new ExpressError('user not found', 400);
    }
    if(!user.registeredQuizzes.includes(quizId)) {
        return res.status(200).json(false);
    }
    return res.status(200).json(true);
}



const getscore = async (quizId, userId) => {
  try {
      const response = await Submission.findOne({ quizId: quizId, userId: userId });
      //-2 if quiz not attempted
      return response ? response.score : -2; // Return score if submission found, else 0
  } catch (error) {
      console.error("Error fetching score:", error);
      return 0; // Return 0 in case of any error
  }
}

module.exports.getYourQuizzes = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
      throw new ExpressError('user not found', 400);
  }
  const registeredQuizzes = user.registeredQuizzes;

  const yourQuizzes = await Quiz.find({ _id: { $in: registeredQuizzes } });

  try {
      const data = await Promise.all(yourQuizzes.map(async (quiz) => {
          const score = await getscore(quiz._id, userId);
          return {
              title: quiz.title,
              startTime: quiz.startTime,
              endTime: quiz.endTime,
              score: score,
              id: quiz._id,
              premium: user.subscriptionTier === "bronze" ? true : false,
          };
      }));

      res.status(200).json(data);
  } catch (error) {
      console.error("Error fetching Contest data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
}


module.exports.addResponseAndUpdateSubmission = async (req, res) => {
    const { answers } = req.body;
    const { timeTaken } = req.body;
    const userId = req.userId;
    const { quizId } = req.params;
    if(!userId || !quizId ) {
      throw new ExpressError('quizId or userId not provided', 400);
    }

    //checking if the submiision time is less than quiz end time
    const now = new Date();
    const quiz = await Quiz.findById(quizId);
    if (quiz.endTime < now) {
      throw new ExpressError("Quiz has ended No submission allowed", 400);
    }

    // check if quiz has been alreday submitted
    const previousSubmission = await Submission.findOne({ userId, quizId });
    if (previousSubmission) {
      throw new ExpressError("Quiz has already been submitted", 400);
    }
    
    const submission = new Submission({
      userId,
      quizId,
      answers,
      correctAnswers,
      totalQuestions: answers.length,
      timeTaken
    })

    await submission.save();

    res.status(200).json("quiz submitted successfully");
};


  
module.exports.getFinalScore = async (req, res) => {
  const { userId, quizId } = req.params;
  if (!userId || !quizId) {
    throw new ExpressError('quizId or userId not provided', 400);
  }
  
  const submission = await Submission.findOne({ userId, quizId });
  if (!submission) {
    throw new ExpressError('Submission not found', 400);
  }
  res.status(200).json({ score: submission.score });
}

module.exports.getQuestions = async (req, res) => {

  const userId = req.userId;
  //check if the user is registered for the quiz
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json('user not found');
  }
  const registeredQuizzes = user.registeredQuizzes;

  if (!registeredQuizzes.includes(req.params.quizid)) {
    throw new ExpressError('You are not registered for this Contest', 400);
  }

  const quizId = req.params.quizid;
  
  const questions = await Question.find({ quizId: quizId });
  const quiz = await Quiz.findById(quizId);
  const duration = quiz.duration*60;
  res.status(200).json({ questions, duration });

}

  
  // module.exports.getSubmissions = async (req, res) => {
  //   const submissions = await Submission.find({ userId: req.userId });
  //   res.status(200).json({ submissions });
  // }



//analytics

module.exports.getQuizAnalytics = async (req, res) => {
  const { quizid } = req.params;
  const userId = req.userId;
  
  if (!userId || !quizid) {
    throw new ExpressError('quizId or userId not provided', 400);
  }

  const submission = await Submission.findOne({ quizId: quizid, userId: userId });
  if (!submission) {
    throw new ExpressError('Submission not found', 400);
  }

  const data = {correctAnswers: submission.correctAnswers,
                totalQuestions: submission.totalQuestions, 
                score: submission.score,
              }
  res.status(200).json(data);
};

module.exports.getWrongAnswers = async (req, res) => {
  const { quizid } = req.params;
  const userId = req.userId;
  if (!userId || !quizid) {
    throw new ExpressError('quizId or userId not provided', 400);
  }
  const submission = await Submission.findOne({ quizId: quizid, userId: userId }).populate('answers.questionId');
  
  let wrongAnswer = []
  submission.answers.forEach(answer => {
    if(!answer.correct){
      const { text, correctOption } = answer.questionId
      wrongAnswer = [...wrongAnswer, {text, correctOption}]
    }
  })
  res.status(200).json(wrongAnswer);

}

module.exports.getLeaderboard = async (req, res) => {
  const { quizid } = req.params;
  
  const leaderboard = await Leaderboard.findOne({ quizId: quizid });
  if (!leaderboard) {
    throw new ExpressError('Leaderboard not found', 400);
  }
  res.status(200).json(leaderboard);
}