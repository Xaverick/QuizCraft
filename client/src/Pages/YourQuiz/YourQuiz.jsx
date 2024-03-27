import { Link } from 'react-router-dom';
import './YourQuiz.scss'
import{ useEffect, useState } from 'react';


const YourQuiz = () => {
  const [users, setUsers] = useState([
    { id: 1, quizTitle: "Math Quiz", score: 80, isLive: true, premium: true},
    { id: 2, quizTitle: "Science Quiz", score: 75, isLive: false, premium: true},
    // Add more users as needed
  ]);


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
        setUsers(finalData); 
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
        <div id="user-list">
          {users.map(user => (
          <div key={user.id} className="user-row">
            <p><strong> {user.title} </strong></p>
            <p><strong>Score:</strong> {user.score}</p>
            <p><strong>Status:</strong> {user.isLive ? "Live" : "Not Live"}</p>
            <div className="actions">
              {user.isLive && <Link to={`/take-quiz/${1}`} className="take-quiz-btn">Take Quiz </Link>}
              {user.premium && <button className="analytics-quiz-btn">view Analytics</button>}
            </div>
          </div>))}
        </div>  
 
      </div>    

    </>
  )
}

export default YourQuiz



