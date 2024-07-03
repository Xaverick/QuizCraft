import React from 'react';
import './ContestData.scss';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/Contestimages/Online_Contest_svg_banner_dark.png';
import tr from '../../assets/Contestimages/tr.png'
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
                <div className='contestdataimage' style={{padding:'10px'}}>
                    <img src={contest.image || defaultImage} alt={contest.title}  style={{width:'100%', borderRadius:'10px'}}/>
                </div>
                <div className='contestdatacontent'>
                    <h3>{contest.title}</h3>
                    <p className='description'>{contest.description}</p>
                </div>
                <div className='contestdatatime'>
                    <div>
                        <p>Event Date</p>
                        <h3>{formatDate(contest.startTime)}</h3>
                    </div>
                    {/* <p>Duration: {contest.duration} mins</p> */}
                    <div className='contesttotalregistered'>
                        {/* <p><img src={tr}></img><span>{contest.totalRegistered}</span>joined</p> */}
                        <div>
                            <img src={tr}></img>
                            +{contest.totalRegistered} Joined
                        </div>
                    </div>
                </div>
                <div className='contestdatabutton'>
                    <button onClick={handleButtonClick}>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default ContestData;
