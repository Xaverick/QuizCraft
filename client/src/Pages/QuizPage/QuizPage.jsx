// QuizPage.jsx
import React, { useState } from 'react';
import './QuizPage.scss';

const QuizPage = () => {
  const [quizData] = useState({
    title: "Sample Quiz",
    description: "This is a sample quiz for demonstration purposes.",
    duration: "30 minutes",
    startDate: new Date("January 1, 2024 12:00:00"),
    endDate: new Date("January 1, 2024 12:30:00"),
    numberOfQuestions: 10
  });

  // Calculate whether the quiz is available based on current time
  const isQuizAvailable = new Date() >= quizData.startDate && new Date() <= quizData.endDate;

  return (
    <div className="quiz-info">
      <h1 className='heading'>{quizData.title}</h1>
      <p className='description'>{quizData.description}</p>
      <p className='info'>Duration: {quizData.duration}</p>
      <p className='info'>Number of Questions: {quizData.numberOfQuestions}</p>
      <p className='info'>Start Date: {quizData.startDate.toLocaleString()}</p>
      <button className="take-quiz-btn" disabled={!isQuizAvailable}>Take Quiz</button>
    </div>
  );
};

export default QuizPage;
