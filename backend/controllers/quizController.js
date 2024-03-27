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
      return response ? response.score : 0; // Return score if submission found, else 0
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
