import { useState, useEffect } from 'react';
import QuizCard from './QuizCard.jsx';
import './AllQuiz.css';

const AllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {

    const getQuizzes = async () => {
      const response = await fetch('http://localhost:4000/quiz/getAllQuizzes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
      else {
        console.log('Failed to fetch quizzes');
      }    
    
  
    }

    getQuizzes();
    
  }, []);

  return (
    <div className='AllQuiz'>
      <h1>Upcoming Quizzes</h1>
      <div>
        {quizzes.map(quiz => (
          <QuizCard
            key={quiz._id}
            startTime={quiz.startTime}
            heading={quiz.title}
            duration={quiz.duration}
            id={quiz._id}
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuiz;
