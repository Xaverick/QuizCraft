import React, { useState, useEffect } from 'react';
import './Commoncd.scss';
import CD from '../../assets/Contestimages/CD.png';
import CT from '../../assets/Contestimages/CT.png';
import Duration from '../../assets/Contestimages/Duration.png';
import NOQ from '../../assets/Contestimages/NOQ.png';
import TM from '../../assets/Contestimages/TM.png';

const Commoncd = ({ data }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [contestStarted, setContestStarted] = useState(false);

    useEffect(() => {
        const calculateEndTime = (startTime, duration) => {
            const [hours, minutes] = duration.split(' ').reduce((acc, val, idx, arr) => {
                if (val.toLowerCase().includes('hour')) acc[0] = parseInt(arr[idx - 1], 10);
                if (val.toLowerCase().includes('minute')) acc[1] = parseInt(arr[idx - 1], 10);
                return acc;
            }, [0, 0]);
            return new Date(startTime.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
        };

        const startDateTime = new Date(`${data.Date} ${data.time}`);
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
    }, [data.Date, data.time, data.duration, contestStarted]);

    return (
        <div className='commoncd-container'>
            <div className='commoncd-left'>
                <div className='commoncd-left-heading'>
                    <p>{data.content1}</p>
                </div>
                <div className='commoncd-left-details'>
                    <span>
                        <img src={CD} alt='' />
                        Event date: {data.Date}
                    </span>
                    <span>
                        <img src={CT} alt='' />
                        Event Time: {data.time}
                    </span>
                    <span>
                        <img src={NOQ} alt='' />
                        No of Questions: {data.totalquestion}
                    </span>
                    <span>
                        <img src={TM} alt='' />
                        Total Marks: {data.totalmarks}
                    </span>
                    <span>
                        <img src={Duration} alt='' />
                        Duration: {data.duration}
                    </span>
                </div>
                <div className='commoncd-left-button'>
                    <button>{data.button}</button>
                </div>
            </div>
            <div className='commoncd-right'>
                <div className='commoncd-right-time'>
                    <span>
                        {contestStarted ? 'Contest Ends in: ' : 'Contest Starts in: '} {timeRemaining}
                    </span>
                </div>
                <div className='commoncd-right-image'>
                    <img src={data.image} alt='' />
                </div>
            </div>
        </div>
    );
};

export default Commoncd;
