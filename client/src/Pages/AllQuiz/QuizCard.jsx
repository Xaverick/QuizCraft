import PropTypes from 'prop-types';
import './QuizCard.scss';
import { Link } from 'react-router-dom';


const QuizCard = ({ startTime, heading, duration, id}) => {

  const startDate = new Date(startTime);
  return (
    <div className="all-quiz-card">
      <div className="quiz-content">
        <h2 className="card-title" onClick={() => {}}> <Link to={`/quiz/${id}`}>{heading}</Link></h2>
        <div className="card-info">
          <p>Start Time: {startDate.toLocaleString()}</p>
          <p>Duration: {duration}</p>
        </div>
      </div>
    </div>
  );
};

QuizCard.propTypes = {
   startTime: PropTypes.string.isRequired,
   heading: PropTypes.string.isRequired,
   duration: PropTypes.number.isRequired,
   id: PropTypes.string.isRequired
};
export default QuizCard;
