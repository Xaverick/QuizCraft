/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './Commoncd.scss';
import CD from '../../assets/Contestimages/CD.png';
import CT from '../../assets/Contestimages/CT.png';
import Duration from '../../assets/Contestimages/Duration.png';
import NOQ from '../../assets/Contestimages/NOQ.png';
import TM from '../../assets/Contestimages/TM.png';
import defaultimage from '../../assets/Contestimages/dumy1.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const Commoncd = ({ data, handleRegister }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

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

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const closeStartModal = () => {
        setIsStartModalOpen(false);
    };

    const handleExploreNow = () => {
        closeRegisterModal();
        setIsRegistered(true);
        toast.success('You have successfully registered for the quiz!', { autoClose: 3000 });
    };

    const handleStartQuiz = () => {
        closeStartModal();
        navigate(`/contestquestion/${data._id}`);
    };

    const handleRegistration = () => {
        if (!isRegistered) {
            setIsRegisterModalOpen(true);
        } else {
            toast.error('You have already registered for the quiz!', { autoClose: 3000 });
        }
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
                        Event date: {eventDate}
                    </span>
                    <span>
                        <img src={CT} alt='' />
                        Event Time: {eventTime}
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
                        Duration: {data.duration} {data.duration > 1 ? 'minutes' : 'minute'}
                    </span>
                </div>
                <div className='commoncd-left-button'>
                    {new Date() > new Date(data.endTime) && <button disabled>Quiz Ended</button>}

                    {new Date() >= new Date(data.startTime) && new Date() <= new Date(data.endTime) && (
                        <button onClick={() => {
                            handleRegister();
                            if (!isRegistered) {
                                setIsStartModalOpen(true);
                            }
                        }}>
                            Register Quiz and Start
                        </button>
                    )}
                    {new Date() <= new Date(data.startTime) && <button onClick={handleRegister} >Register Now</button>}

                </div>
            </div>
            <div className='commoncd-right'>
                <div className='commoncd-right-time'>

                    <span>
                        {new Date() >= new Date(data.startTime) && new Date() <= new Date(data.endTime) && `You can give Quiz in: ${timeRemaining}`}
                        {new Date() < new Date(data.startTime) && `Quiz will start in: ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / (1000 * 60 * 60)))}hr ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / (1000 * 60)) % 60)}min  ${Math.max(0, Math.floor((new Date(data.startTime) - new Date()) / 1000) % 60)}s`}
                        {new Date() > new Date(data.endTime) && 'Quiz has ended'}
                    </span>

                </div>
                <div className='commoncd-right-image'>
                    {data.image ? <img src={data.image} alt='' /> : <img src={defaultimage} alt='' />}
                </div>
                <ToastContainer />
            </div>

            {/* Register Modal */}
            <Modal isOpen={isRegisterModalOpen} onRequestClose={closeRegisterModal} className='modal' overlayClassName='overlay'>
                <h2>Register for Quiz</h2>
                <p>Join the quiz now to compete with others!</p>
                <img src={defaultimage} alt='Register' />
                <button onClick={handleExploreNow}>Explore Now</button>
            </Modal>

            {/* Start Modal */}
            <Modal isOpen={isStartModalOpen} onRequestClose={closeStartModal} className='modal' overlayClassName='overlay'>
                <h2>Quiz Starting</h2>
                <p>The quiz is about to begin. Get ready!</p>
                <img src={defaultimage} alt='Start Quiz' />
                <button onClick={handleStartQuiz}>Start Now</button>
            </Modal>
        </div>
    );
};

export default Commoncd;
