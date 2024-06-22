/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Commoncd.scss';
import CD from '../../assets/Contestimages/CD.png';
import CT from '../../assets/Contestimages/CT.png';
import Duration from '../../assets/Contestimages/Duration.png';
import NOQ from '../../assets/Contestimages/NOQ.png';
import TM from '../../assets/Contestimages/TM.png';
import defaultimage from '../../assets/Contestimages/dumy1.png';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import tr from '../../assets/Contestimages/tr.png'
Modal.setAppElement('#root');

const Commoncd = ({ data }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    // const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    // const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {
            const response = await axios.post(`/quiz/registerQuiz/${data._id}`);

            if (response.status == 200) {

                toast.success(response.data, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }

        }

        catch (error) {

            // console.log(error);
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            });
        }

    };


    const isregis = async () => {
        const response = await axios.post(`/quiz/isRegistered/${data._id}`);
        // console.log(response.data);
        return response.data;
    }








    useEffect(() => {
        const calculateEndTime = (endTime) => {
            return new Date(endTime);
        };

        if (data && data.endTime) {
            const endDateTime = calculateEndTime(data.endTime);

            const updateCountdown = () => {
                const currentDateTime = new Date();

                if (currentDateTime >= endDateTime) {
                    setTimeRemaining('Quiz has ended!');
                    return;
                }

                const timeDiff = endDateTime - currentDateTime;
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            };

            const intervalId = setInterval(updateCountdown, 1000);

            // Show start modal when quiz starts
            // setTimeout(() => {
            //     setIsStartModalOpen(true);
            // }, endDateTime - Date.now());

            return () => clearInterval(intervalId);
        }
    }, [data]);

    if (!data || !data.endTime) {
        return <div>Loading...</div>;
    }

    const eventDate = new Date(data.startTime).toLocaleDateString('en-GB');
    const eventTime = new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const eventendtime = new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // console.log(eventendtime)
    // console.log(new Date(eventendtime))
    // console.log(new Date())
    // console.log(eventDate);
    // console.log(eventTime);
    // console.log(data.startTime);
    // console.log(data.endTime);
    // console.log(data);

    const closeStartModal = () => {
        setIsStartModalOpen(false);
    };

    const handleStartQuiz = () => {
        closeStartModal();
        navigate(`/contestquestion/${data._id}`);
    };

    return (
        <div className='commoncd-container'>
            <div className='commoncd-left'>
                <div className='commoncd-left-heading'>
                    <p>{data.title || 'No Title'}</p>
                </div>
                <div className='commoncd-left-details'>
                    <span>
                        <img src={CD} alt='' />
                        Event date: <span>{eventDate}</span>
                    </span>
                    <span>
                        <img src={CT} alt='' />
                        Event Time: <span>{eventTime}</span>
                    </span>
                    <span>
                        <img src={NOQ} alt='' />
                        No of Questions: <span>{data.questions ? data.questions.length : 'N/A'}</span>
                    </span>
                    <span>
                        <img src={TM} alt='' />
                        Total Marks:<span>{data.totalMarks || 'N/A'}</span>
                    </span>
                    <span>
                        <img src={Duration} alt='' />
                        Duration: <span>{data.duration} {data.duration > 1 ? 'minutes' : 'minute'}</span>
                    </span>

                    <div className='contesttotalregistered'>
                        {/* <p><img src={tr}></img><span>{contest.totalRegistered}</span>joined</p> */}
                        <div>
                            <img src={tr}></img>
                            +{data.totalRegistered} Joined
                        </div>
                    </div>

                </div>
                <div className='commoncd-left-button'>
                    {Date.now() > new Date(data.endTime) && <button disabled>Contest Ended</button>}

                    {Date.now() >= new Date(data.startTime) && Date.now() <= new Date(data.endTime) && (
                        <button onClick={async () => {
                            if (!(await isregis())) {
                                toast.error('You cannot register because contest has already started ');
                            }
                            else {
                                setIsStartModalOpen(true);
                            }
                        }}>
                            Start Contest
                        </button>
                    )}
                    {Date.now() < new Date(data.startTime) && <button onClick={handleRegister} >Register Now</button>}

                </div>
            </div>
            <div className='commoncd-right'>
                <div className='commoncd-right-time'>

                    <span>
                        {new Date() >= new Date(data.startTime) && new Date() <= new Date(data.endTime) && `You can give Contest in: ${timeRemaining}`}
                        {new Date() < new Date(data.startTime) && `Contest will start in: ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / (1000 * 60 * 60)))}hr ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / (1000 * 60)) % 60)}min  ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / 1000) % 60)}s`}
                        {new Date() > new Date(data.endTime) && 'Contest has ended'}
                    </span>

                </div>
                <div className='commoncd-right-image'>
                    {data.image ? <img src={data.image} alt='' /> : <img src={defaultimage} alt='' />}
                </div>

            </div>
            <Modal isOpen={isStartModalOpen} onRequestClose={closeStartModal} className='modal' overlayClassName='overlay'>
                <h2>Contest Started</h2>
                <p>Please Click on Start now for start the Contest</p>
                <img src={defaultimage} alt='Start Quiz' />
                <button onClick={handleStartQuiz}>Start Now</button>
            </Modal>
        </div>
    );
};

export default Commoncd;
