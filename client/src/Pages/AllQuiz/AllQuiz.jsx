import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard.jsx';
import './AllQuiz.css';

const AllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  // Simulated data fetching (replace with actual API call)
  useEffect(() => {
    // Example data
    const data = [
      { id: 1, startTime: 'March 21, 2024 09:00:00', heading: 'Math Quiz', duration: '60 minutes' },
      { id: 2, startTime: 'March 22, 2024 10:00:00', heading: 'Science Quiz', duration: '45 minutes' },
      { id: 3, startTime: 'March 23, 2024 11:00:00', heading: 'History Quiz', duration: '30 minutes' },
    ];

    setQuizzes(data);
  }, []);

  return (
    <div className='AllQuiz'>
      <h1>Upcoming Quizzes</h1>
      <div>
        {quizzes.map(quiz => (
          <QuizCard
            key={quiz.id}
            startTime={quiz.startTime}
            heading={quiz.heading}
            duration={quiz.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuiz;
