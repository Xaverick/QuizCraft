import React from 'react';
import PropTypes from 'prop-types';
import './QuizCard.css';

const QuizCard = ({ startTime, heading, duration }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-details">
        <h2 className="quiz-heading">{heading}</h2>
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
