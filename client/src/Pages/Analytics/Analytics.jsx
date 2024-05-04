import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Analytics.scss';
import { Chart } from "react-google-charts";
import axios from 'axios'



export const options = {
  // title: "My Daily Activities",
  is3D: true,
  slices: {
    0: { color: "#00FF00" },
    1: { color: "#FF0000" },
    2: { color: "#0000FF" },
  },
  legend: "none",
  pieSliceText: "label",
  chartArea:{left:0,top:0,width:"100%",height:"100%"}
};


const Analytics = () => {
    const { id } = useParams();
    const [analyticsData, setAnalyticsData] = useState([])
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([])


    const pidata = [
      ["Label", "Value"],
      ["Correct", analyticsData.correctAnswers],
      ["Wrong", analyticsData.wrongAnswers],
      ["Not Attempted", analyticsData.totalQuestions - analyticsData.correctAnswers - analyticsData.wrongAnswers],
    ];
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


    useEffect(() => {
      const fetchWrongAnswers = async () => {    
        const response = await fetch(`http://localhost:4000/quiz/getWrongAnswers/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          let data = await response.json();
          setWrongAnswers(data);
        }
        else{
          console.log('error');
        }
      }     
      fetchWrongAnswers();

  }, []);

  useEffect(() => {
    // Fetch leaderboard data from backend
    const fetchLeaderboardData = async () => {    
      const response = await fetch(`http://localhost:4000/quiz/getLeaderboard/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setLeaderboardData(data.ranks);
      }
      else{
        console.log('error');
      }
    }     
    fetchLeaderboardData();
  }, []);

  return (
    <div className="analytics">
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
        <div className="not-attemptted">
          <p>Not Attempted</p>
          <p>
            {analyticsData.totalQuestions -
              (analyticsData.correctAnswers + analyticsData.wrongAnswers)}
          </p>
        </div>
      </div>

      <div className="mid-section">
        <div className="questions">
          <h1>Wrong Answers</h1>
          {wrongAnswers.map((question, index) => (
            <div className="box" key={index}>
              <p className="question">
                {index + 1}. {question.text}
              </p>
              <p className="answer">Ans. {question.correctOption}</p>
            </div>
          ))}
        </div>
        <div className="chart">
          <Chart
            chartType="PieChart"
            data={pidata}
            options={options}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>

      {/* Leaderboard */}
      <div className="container mx-auto mt-8 w-[80%]">
        <h2 className="text-3xl font-semibold mb-4">Leaderboard</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardData && leaderboardData.map((player, index) => (
              <tr key={player.name}>
                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {player.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{player.score}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{player.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics