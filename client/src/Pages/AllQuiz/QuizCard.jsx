import React from 'react';
import PropTypes from 'prop-types';
import './QuizCard.css';
import { Link } from 'react-router-dom';


const QuizCard = ({ startTime, heading, duration, id}) => {
  return (
    <div className="quiz-card">
      <div className="quiz-details">
        <h2 className="quiz-heading" onClick={() => {}}> <Link to={`/quiz/${id}`}>{heading}</Link></h2>
        <p>Start Time: {startTime}</p>
        <p>Duration: {duration}</p>
      </div>
    </div>
  );
};

QuizCard.propTypes = {
   startTime: PropTypes.string.isRequired,
   heading: PropTypes.string.isRequired,
   duration: PropTypes.string.isRequired,
};
export default QuizCard;
