import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Analytics.scss';

const Analytics = () => {
    const { id } = useParams();
    const [analyticsData, setAnalyticsData] = useState([])

    useEffect(() => {
        const fetchQuizData = async () => {    
          const response = await fetch(`http://localhost:4000/quiz/getQuizAnalytics/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (response.ok) {
            let data = await response.json();     
            const wrongAnswer = data.totalQuestions - data.correctAnswers;
            data = ({...data, wrongAnswers: wrongAnswer})
  
            setAnalyticsData(data);


          }
        }     

        

        fetchQuizData();
        console.log(analyticsData);
    }, []);


  return (
    <div className='analytics'>

      <h1>Analytics</h1>

      <div className="generalAnalytics">
        <div className="correct-card">
          <p>Correct Answers</p>
          <p>{analyticsData.correctAnswers}</p>
        </div>
        <div className="wrong-card">
          <p>Wrong Answers</p>
          <p>{analyticsData.wrongAnswers}</p>
        </div>
        <div className="total-card">
          <p>Total Questions</p>
          <p>{analyticsData.totalQuestions}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Analytics