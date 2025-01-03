const User = require("../models/adminModel");
const sendMail = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Quiz = require("../models/quizzes");
const Question = require("../models/questions");
const Submission = require("../models/submissions");
const Leaderboard = require("../models/leaderboard");
const ExpressError = require("../utils/ExpressError");
const moment = require("moment-timezone");
const userModel = require("../models/userModel");
const profile = require("../models/profileModel");
const mongoose = require("mongoose");

module.exports.adminlogin = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new ExpressError("missing fields", 400);
  }

  email = email.toLowerCase();
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ExpressError("invalid credentials", 400);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ExpressError("invalid credentials", 400);
  }
  const payload = {
    adminId: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, `${process.env.ADMIN_SECRET}`, {
    expiresIn: "3h",
  });
  res.cookie("adminjwt", token, {
    signed: true,
    httpOnly: false,
    sameSite: "none",
    maxAge: 3 * 1000 * 60 * 60,
    secure: true,
  });
  res.status(200).json({
    token,
    user: user._id,
    expiresIn: new Date(Date.now() + 3 * 60 * 60 * 1000),
  });
};

module.exports.adminlogout = (req, res) => {
  res.clearCookie("adminjwt").json("logout");
};

module.exports.adminregister = async (req, res) => {
  let { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new ExpressError("missing fields", 400);
  email = email.toLowerCase();
  const registeredEmail = await User.findOne({
    email: email,
    username: username,
  });

  if (registeredEmail) {
    throw new ExpressError("email or username already registered", 400);
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await User.create({ username, email, password: hash });
  // await sendVerificationEmail(email,user);
  res.status(200).json("register successful");
};

module.exports.createQuiz = async (req, res) => {
  // console.log(req.body);
  const { title, description, startTime, endTime, duration, rules, category } =
    req.body;
  console.log(req.body);
  if (
    (!title || !description || !startTime || !endTime || !duration || !rules,
    !category)
  ) {
    throw new ExpressError("missing fields", 400);
  }

  const startTimeUTC = moment(startTime).utc().toDate();
  const endTimeUTC = moment(endTime).utc().toDate();

  const newQuiz = new Quiz({
    title,
    description,
    startTime: startTimeUTC,
    endTime: endTimeUTC,
    duration,
    adminId: req.adminId,
    rules: rules,
    category: category,
  });

  if (!newQuiz) {
    throw new ExpressError("Error creating quiz", 500);
  }

  const savedQuiz = await newQuiz.save();

  if (!savedQuiz) {
    throw new ExpressError("Error saving quiz", 500);
  }
  res.json({ message: "quiz created", quizId: savedQuiz._id });
};

module.exports.updateQuiz = async (req, res) => {
  const { title, description, startTime, endTime, duration, rules, category } =
    req.body;
  const quizId = req.params.quizid;

  const startTimeUTC = moment(startTime).utc().toDate();
  const endTimeUTC = moment(endTime).utc().toDate();

  if (
    (!title || !description || !startTime || !endTime || !duration || !rules,
    !category)
  ) {
    throw new ExpressError("missing fields", 400);
  }
  // Extract userId from request parameters and convert to ObjectId

  const quiz = await Quiz.findByIdAndUpdate(quizId, {
    title,
    description,
    startTime: startTimeUTC,
    endTime: endTimeUTC,
    duration,
    rules,
    category,
  });
  if (!quiz) {
    throw new ExpressError("quiz not found", 400);
  }
  res.json("quiz updated");
};

module.exports.deleteQuiz = async (req, res) => {
  const quizId = req.params.quizid;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ExpressError("quiz not found", 400);
  }
  const questionIds = quiz.questions;
  const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
  if (!deletedQuiz) {
    throw new ExpressError("quiz not found", 400);
  }
  if (questionIds.length === 0) {
    return res.json("Quiz deleted");
  }
  await Question.deleteMany({ _id: { $in: questionIds } });
  res.json("Quiz and associated questions deleted");
};

module.exports.getQuizzes = async (req, res) => {
  const adminId = req.params.adminid;
  const quizzes = await Quiz.find({ adminId: adminId });
  if (!quizzes) {
    throw new ExpressError("no quizzes found", 400);
  }
  res.json(quizzes);
};

module.exports.getQuiz = async (req, res) => {
  const quizId = req.params.quizid;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ExpressError("quiz not found", 400);
  }
  res.json(quiz);
};

module.exports.getQuestions = async (req, res) => {
  const quizId = req.params.quizid;
  const questions = await Question.find({ quizId: quizId });
  if (!questions) {
    throw new ExpressError("no questions found", 400);
  }
  res.json(questions);
};

module.exports.getQuestionByQuestionId = async (req, res) => {
  const questionId = req.params.questionId;
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ExpressError("question not found", 400);
  }
  res.json(question);
};

module.exports.createQuestion = async (req, res) => {
  const { type, text, options, correctOption } = req.body;
  const quizId = req.params.quizid;

  if (!text || !type || !correctOption) {
    throw new ExpressError("missing fields", 400);
  }

  const newQuestion = new Question({
    type,
    text,
    options,
    correctOption,
    quizId,
  });
  const savedQuestion = await newQuestion.save();

  if (!savedQuestion) {
    throw new ExpressError("Error saving question", 500);
  }

  // Find the quiz by ID and update its questions array
  const quiz = await Quiz.findByIdAndUpdate(
    quizId,
    { $push: { questions: savedQuestion._id } },
    { new: true }
  );

  if (!quiz) {
    throw new ExpressError("Error finding quiz", 500);
  }

  res.json({ message: "question created", questionId: savedQuestion._id });
};

module.exports.updateQuestion = async (req, res) => {
  const { text, options, correctOption } = req.body;
  const questionId = req.params.questionid;

  if (!text || !options || !correctOption) {
    throw new ExpressError("missing fields", 400);
  }

  const question = await Question.findByIdAndUpdate(questionId, {
    text,
    options,
    correctOption,
  });
  if (!question) {
    throw new ExpressError("question not found", 400);
  }
  res.json("question updated");
};

module.exports.deleteQuestion = async (req, res) => {
  const questionId = req.params.questionid;

  const question = await Question.findById(questionId);
  if (!question) {
    throw new ExpressError("question not found", 400);
  }

  const quizId = question.quizId;

  // Delete the question
  const deletedQuestion = await Question.findByIdAndDelete(questionId);
  if (!deletedQuestion) {
    throw new ExpressError("question not found", 400);
  }

  // Remove the question ID from the Quiz array of questions
  await Quiz.findByIdAndUpdate(
    quizId,
    { $pull: { questions: questionId } },
    { new: true }
  );

  res.json("Question deleted and removed from Quiz");
};

const calculateScore = (submission, quiz) => {
  const { answers } = submission;
  let score = 0;
  answers.forEach((answer) => {
    if (answer.correct) {
      score++;
    }
  });
  return score;
};

const addRating = async (leaderboard) => {
  const ranksDescending = leaderboard.ranks.sort((a, b) => {
    return b.score - a.score;
  });
  let rating = 0;
  for (i = 0; i < ranksDescending.length; i++) {
    if (i == 0) {
      // rank first: 30 rating alloted
      rating = 30;
      // const userClient = await userModel.findOne({_id : ranksDescending[i].userId.id}).populate('profile');
      // if(userClient.profile == undefined){
      //     continue;
      // }
      const ratingUpdateOnProfile = await profile.updateOne(
        { userId: ranksDescending[i].userId },
        { $inc: { rating: rating } }
      );
    } else if (i == 1) {
      // rank second: 25 rating alloted
      rating = 25;
      // const userClient = await userModel.findOne({_id : ranksDescending[i].userId.id}).populate('profile');
      // if(userClient.profile == undefined){
      //     continue;
      // }
      const ratingUpdateOnProfile = await profile.updateOne(
        { userId: ranksDescending[i].userId },
        { $inc: { rating: rating } }
      );
    } else if (i == 2) {
      // rank third: 20 rating alloted
      rating = 20;
      // const userClient = await userModel.findOne({_id : ranksDescending[i].userId.id}).populate('profile');
      // if(userClient.profile == undefined){
      //     continue;
      // }
      const ratingUpdateOnProfile = await profile.updateOne(
        { userId: ranksDescending[i].userId },
        { $inc: { rating: rating } }
      );
    } else if (i > 2 && i < 10) {
      // rank 4 to 10: 15 rating alloted
      rating = 15;
      // const userClient = await userModel.findOne({_id : ranksDescending[i].userId.id}).populate('profile');
      // if(userClient.profile == undefined){
      //     continue;
      // }
      const ratingUpdateOnProfile = await profile.updateOne(
        { userId: ranksDescending[i].userId },
        { $inc: { rating: rating } }
      );
    } else {
      // rank rest of participants: 10 rating alloted
      rating = 10;
      // const userClient = await userModel.findOne({_id : ranksDescending[i].userId.id}).populate('profile');
      // if(userClient.profile == undefined){
      //     continue;
      // }
      const ratingUpdateOnProfile = await profile.updateOne(
        { userId: ranksDescending[i].userId },
        { $inc: { rating: rating } }
      );
    }
  }
};

module.exports.compileResults = async (req, res) => {
  const quizId = req.params.quizid;
  const submissions = await Submission.find({ quizId: quizId }).populate(
    "userId"
  );

  if (!submissions) {
    throw new ExpressError("no submissions found", 400);
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ExpressError("quiz not found", 400);
  }

  let leaderboard = await Leaderboard.findOne({ quizId: quizId }).populate(
    "ranks.userId"
  );
  if (!leaderboard) {
    leaderboard = new Leaderboard({ quizId });
  }

  submissions.forEach((submission) => {
    if (submission.userId != null) {
      submission.score = calculateScore(submission, quiz);
      submission.correctAnswers = submission.answers.filter(
        (answer) => answer.correct
      ).length;
      leaderboard.addUser(
        submission.userId._id,
        submission.score * 10,
        submission.userId.username,
        submission.userId.country
      );
      submission.save();
    }
  });

  addRating(leaderboard);

  await leaderboard.save();
  res.status(200).json("results compiled");
};

module.exports.referralDetails = async (req, res) => {
  const referrers = await profile
    .find({ totalUsersReferred: { $gt: 0 } })
    .populate("userId");
  //   console.log(referrers);
  const arrayToSend = [];
  for (let i = 0; i < referrers.length; i++) {
    let objToPush = {};
    objToPush.username = referrers[i].userId.username;
    objToPush.totalUsersReffered = referrers[i].totalUsersReferred;
    arrayToSend.push(objToPush);
  }
  res.status(200).json({ referralDetails: arrayToSend });
};

module.exports.giveVerifyBadge = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentValue = user.verificationBadge;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { verificationBadge: !currentValue } },
      { new: true, select: "verificationBadge _id" }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(500).send("Failed to update user verification status");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports.givePremiumBadge = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentValue = user.premiumBadge;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { premiumBadge: !currentValue } },
      { new: true, select: "premiumBadge _id" }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(500).send("Failed to update user verification status");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports.getRegisteredUsersByAdmin = async (req, res) => {
  try {
    const users = await userModel.find()
      .select(
        "_id username name email verificationBadge premiumBadge picture profile username"
      )
      .populate({
        path: "profile",
        select: "occupation phoneNumber rating coin", // Select the occupation field from the profile
      })
      .lean();

    const data = users.map((user) => ({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        verificationBadge: user.verificationBadge,
        premiumBadge: user.premiumBadge,
        picture: user.picture,
        occupation: user.profile?.occupation,
        phoneNumber: user.profile?.phoneNumber,
        rating: user.profile?.rating,
        username: user.username,
        coins: user.profile?.coin,
      }));

      return res.status(200).json(data);
      
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
  }
};
