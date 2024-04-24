const User = require('../models/userModel');
const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
const Submission  = require('../models/submissions');



module.exports.getAllQuizes= async (req, res) => {
    const quizes = await Quiz.find();
    res.json(quizes);
}

module.exports.getQuiz = async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizid);
    res.json(quiz);
}


module.exports.registerQuiz = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.userId;
    if(!userId && !quizId) {
      return res.status(400).json('Invalid request Give full parameters');
    }

    else{
    // Check if user has already registered for the quiz
      const user = await User.findById(userId);
      
      if (user.registeredQuizzes.includes(quizId)) {
        return res.status(400).json('You have already registered for this quiz');
      }
      else{
        const quiz = await Quiz.findById(quizId);
        user.registeredQuizzes.push(quizId);
        await user.save();
        quiz.totalRegistered++;
        await quiz.save();
        res.status(200).json('Quiz registered');
      }
    }
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
  const registeredQuizzes = user.registeredQuizzes;
  const yourQuizzes = await Quiz.find({ _id: { $in: registeredQuizzes } });

  try {
      const data = await Promise.all(yourQuizzes.map(async (quiz) => {
          const score = await getscore(quiz._id, userId);
          return {
              title: quiz.title,
              endTime: quiz.endTime,
              score: score,
              id: quiz._id,
              premium: user.subscriptionTier === "bronze" ? true : false,
          };
      }));

      res.status(200).json(data);
  } catch (error) {
      console.error("Error fetching quiz data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
}


module.exports.addResponseAndUpdateSubmission = async (req, res) => {
    const { answers } = req.body;
    const userId = req.userId;
    const { quizId } = req.params;
    if(!userId || !quizId ) {
      return res.status(400).json('Invalid request Give full parameters');
    }


    //checking if the submiision time is less than quiz end time
    const now = new Date();
    const quiz = await Quiz.findById(quizId);
    if (quiz.endTime < now) {
      return res.status(400).json("Quiz has ended");
    }

    // //check if quiz has been alreday submitted

    const previousSubmission = await Submission.findOne({ userId, quizId });
    if (previousSubmission) {
      return res.status(400).json("Quiz has already been submitted");
    }

    console.log(answers);
    
    const submission = new Submission({
      userId,
      quizId,
      answers,
      totalQuestions: answers.length,
    })

    await submission.save();

    res.status(200).json("quiz submitted");
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

    const userId = req.userId;
    //check if the user is registered for the quiz
    const user = await User.findById(userId);
    const registeredQuizzes = user.registeredQuizzes;
    if (!registeredQuizzes.includes(req.params.quizid)) {
      return res.status(400).json('You are not registered for this quiz');
    }

    const quizId = req.params.quizid;
    const questions = await Question.find({ quizId: req.params.quizid });
    res.status(200).json(questions);
  
  }

  
  // module.exports.getSubmissions = async (req, res) => {
  //   const submissions = await Submission.find({ userId: req.userId });
  //   res.status(200).json({ submissions });
  // }



  //analytics


  module.exports.getQuizAnalytics = async (req, res) => {
    const { quizid } = req.params;
    const userId = req.userId;
    const submission = await Submission.findOne({ quizId: quizid, userId: userId });
    const data = {correctAnswers: submission.correctAnswers,
                  totalQuestions: submission.totalQuestions, 
                  score: submission.score,
                }
    res.status(200).json(data);
  };