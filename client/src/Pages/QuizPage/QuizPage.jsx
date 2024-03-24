import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuizPage.scss';


const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [validQuiz, setValidQuiz] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/quiz/getQuiz/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          console.log('Failed to fetch quiz data');
          setValidQuiz(false);
          return;
        }

        const data = await response.json();
        console.log(data);
        setQuizData(data); 
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [id]);

  const startDate = new Date(quizData.startTime);
  const endDate = new Date(quizData.endTime);

  return (
    <>
    {!validQuiz && (     
      <div className='quiz-info'>
        <h1 className='heading'>Quiz Not Found</h1>
      </div>
    )}

    {validQuiz && (
      <div className="quiz-info">
        
        <h1 className='heading'>{quizData.title}</h1>
        <p className='description'>{quizData.description}</p>
        <p className='info'>Duration: {quizData.duration}</p>
        <p className='info'>Number of Questions: {quizData.numberOfQuestions}</p>
        <p className='info'>Start Date: {startDate.toLocaleString()}</p>
        <p className='info'>End Date: {endDate.toLocaleString()}</p>
        
        <p className='info'>Number of registered students: 0</p>
        <button className="take-quiz-btn">Register for Quiz</button>
      </div>
    )}
  </>
  );
};

export default QuizPage;

