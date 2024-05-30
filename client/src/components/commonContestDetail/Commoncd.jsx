import React, { useState, useEffect } from 'react';
import './Commoncd.scss';
import CD from '../../assets/Contestimages/CD.png';
import CT from '../../assets/Contestimages/CT.png';
import Duration from '../../assets/Contestimages/Duration.png';
import NOQ from '../../assets/Contestimages/NOQ.png';
import TM from '../../assets/Contestimages/TM.png';
import defaultimage from '../../assets/Contestimages/dumy1.png'
const Commoncd = ({ data }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [contestStarted, setContestStarted] = useState(false);

    useEffect(() => {
        const calculateEndTime = (startTime, duration) => {
            const durationInMs = duration * 60 * 60 * 1000;
            return new Date(startTime.getTime() + durationInMs);
        };

        if (data && data.startTime && data.duration) {
            const startDateTime = new Date(data.startTime);
            const endDateTime = calculateEndTime(startDateTime, data.duration);

            const updateCountdown = () => {
                const now = new Date();
                let timeDiff;

                if (!contestStarted) {
                    timeDiff = startDateTime - now;
                    if (timeDiff <= 0) {
                        setContestStarted(true);
                        timeDiff = endDateTime - now;
                    }
                } else {
                    timeDiff = endDateTime - now;
                    if (timeDiff <= 0) {
                        setTimeRemaining('Contest has ended!');
                        return;
                    }
                }

                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            };

            const intervalId = setInterval(updateCountdown, 1000);

            return () => clearInterval(intervalId);
        }
    }, [data, contestStarted]);

    if (!data || !data.startTime || !data.duration) {
        return <div>Loading...</div>;
    }

    return (
        <div className='commoncd-container'>
            <div className='commoncd-left'>
                <div className='commoncd-left-heading'>
                    <p>{data.title || 'No Title'}</p>
                </div>
                <div className='commoncd-left-details'>
                    <span>
                        <img src={CD} alt='' />
                        Event date: {new Date(data.startTime).toLocaleDateString()}
                    </span>
                    <span>
                        <img src={CT} alt='' />
                        Event Time: {new Date(data.startTime).toLocaleTimeString()}
                    </span>
                    <span>
                        <img src={NOQ} alt='' />
                        No of Questions: {data.questions ? data.questions.length : 'N/A'}
                    </span>
                    <span>
                        <img src={TM} alt='' />
                        Total Marks: {data.totalMarks || 'N/A'}
                    </span>
                    <span>
                        <img src={Duration} alt='' />
                        Duration: {data.duration} Hour{data.duration > 1 ? 's' : ''}
                    </span>
                </div>
                <div className='commoncd-left-button'>
                    <button>Register</button>
                </div>
            </div>
            <div className='commoncd-right'>
                <div className='commoncd-right-time'>
                    <span>
                        {contestStarted ? 'Contest Ends in: ' : 'Contest Starts in: '} {timeRemaining}
                    </span>
                </div>
                <div className='commoncd-right-image'>
                    {data.image ? <img src={data.image} alt='' /> : <img src={defaultimage} alt='' />}
                </div>
            </div>
        </div>
    );
};

export default Commoncd;
