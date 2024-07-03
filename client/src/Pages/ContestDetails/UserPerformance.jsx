/* eslint-disable react/prop-types */
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserPerformance = ({ performanceData, contestGiven }) => {
  const calculatePercentage = (correct, total) => {
    return total > 0 ? ((correct / total) * 100).toFixed(2) : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const totalQuestions = performanceData.totalQuestions || 0;
  const correctAnswers = performanceData.correctAnswers || 0;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div>
      {contestGiven && performanceData ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "30px",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              maxWidth: "200px",
              width: "100%",
            }}
          >
            <CircularProgressbar
              value={calculatePercentage(correctAnswers, totalQuestions)}
              text={`${calculatePercentage(correctAnswers, totalQuestions)}%`}
            />
            
          </div>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              padding: "20px",
              maxWidth: "600px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "#a6f0fdbf",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                color: "black",
              }}
            >
              <h3>Total Questions</h3>
              <div>{totalQuestions}</div>
            </div>
            <div
              style={{
                backgroundColor: "#a6f0fdbf",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                color: "black",
              }}
            >
              <h3>Correct Answers</h3>
              <div>{correctAnswers}</div>
            </div>
            <div
              style={{
                backgroundColor: "#a6f0fdbf",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                color: "black",
              }}
            >
              <h3>Wrong Answers</h3>
              <div>{incorrectAnswers}</div>
            </div>
            <div
              style={{
                backgroundColor: "#a6f0fdbf",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                color: "black",
              }}
            >
              <h3>Submission Time</h3>
              <div>{formatDate(performanceData.submittedAt)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserPerformance;
