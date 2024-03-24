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
