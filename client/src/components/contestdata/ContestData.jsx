import React from 'react';
import './ContestData.scss';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/Contestimages/dumy2.png';

const ContestData = ({ contest }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/contest/${contest._id}`);
    };

    // Function to format date as "25 May, 2024"
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (
        <div className='contest'>
            <div className='contestdatabox'>
                <div className='contestdataimage'>
                    <img src={contest.image || defaultImage} alt={contest.title} />
                </div>
                <div className='contestdatacontent'>
                    <h3>{contest.title}</h3>
                    <p>{contest.description}</p>
                </div>
                <div className='contestdatatime'>
                    <p>Event Date</p>
                    <h3>{formatDate(contest.startTime)}</h3>
                    {/* <p>Duration: {contest.duration} mins</p> */}
                </div>
                <div className='contestdatabutton'>
                    <button onClick={handleButtonClick}>Register Now</button>
                </div>
            </div>
        </div>
    );
};

export default ContestData;
