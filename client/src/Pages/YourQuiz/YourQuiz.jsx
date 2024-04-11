import { Link } from 'react-router-dom';
import './YourQuiz.scss'
import{ useEffect, useState } from 'react';


const YourQuiz = () => {
  const [quizes, setquizes] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {    
      const response = await fetch(`http://localhost:4000/quiz/yourQuizzes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();       
        const finalData = data.map((user) => {
          return {
            ...user,
            isLive: new Date(user.endTime) > new Date() ? true : false
          };
        })

        console.log(finalData);
        setquizes(finalData); 
      }

      else {
        console.log('Failed to fetch quiz data');
      }
    }
    fetchQuizData();

  }, []);


  return (
    <>
      <div className="content">
        <h1>Your Quizzes</h1>
        <div id="quiz-list">
          {quizes.map(quiz => (
          <div key={quiz.id} className="user-row">
            <p><strong> {quiz.title} </strong></p>
            <p><strong>Score: </strong> 
              { quiz.score === -2 ? "Not Attempted" : (quiz.score === -1 ? "In Progress" : quiz.score) }              
            </p>
            <p><strong>Status: </strong> {quiz.isLive ? "Live" : "Not Live"}</p>
            <div className="actions">
              {quiz.isLive && quiz.score !== -1 && !(quiz.score >= 0) && <Link to={`/take-quiz/${quiz.id}`} className="take-quiz-btn">Take Quiz </Link>}
              {quiz.premium && quiz.score !== -1 && quiz.score !== -2 && <Link to={`/analytics/${quiz.id}`} className="analytics-quiz-btn">view Analytics</Link>}
            </div>
          </div>))}
        </div>  
      </div>    

    </>
  )
}

export default YourQuiz



