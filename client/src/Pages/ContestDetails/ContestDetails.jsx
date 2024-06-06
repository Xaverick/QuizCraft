import { useState, useEffect } from 'react';
import './ContestDetails.scss';
import { useParams } from 'react-router-dom';
import Commoncd from '../../components/commonContestDetail/Commoncd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const ContestDetails = () => {
    const [activeSection, setActiveSection] = useState('details');
    const [quizData, setQuizData] = useState({});
    const { id } = useParams();

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        const fetchQuizData = async () => {

            try {
                const response = await axios.get(`/quiz/getQuiz/${id}`);
                if (response.status === 200) {
                    setQuizData(response.data);

                } else {
                    throw new Error('Failed to fetch quiz data');
                }

            } catch (error) {
                console.error('Error fetching quiz data:', error);
                toast.error('Failed to fetch quiz data', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };

        fetchQuizData();
    }, [id]);

    const handleRegister = async () => {

        const response = await axios.post(`/quiz/registerQuiz/${id}`)

        if (response.status === 200) {
            toast.success(response.data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            toast.error(response.data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            });
        }

        // const response = await fetch(`http://localhost:4000/quiz/registerQuiz/${id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include'
        // });

        // const message = await response.json();
        // console.log(message);

        // if (response.ok) {
        //     toast.success(message, {
        //         position: "top-left",
        //         autoClose: 2000,
        //         hideProgressBar: true,
        //     });
        // } else {
        //     toast.error(message, {
        //         position: "top-left",
        //         autoClose: 2000,
        //         hideProgressBar: true,
        //     });
        // }
    };

    return (
        <div className="contestdetailspage">
            <div className='contestdetailspart-1'>
                <div>
                    <Commoncd data={quizData} handleRegister={handleRegister} />
                </div>
            </div>
            <div className='mini-nav'>
                <div className='mini-nav-items'>
                    <div
                        className={`mini-nav-item ${activeSection === 'details' ? 'active' : ''}`}
                        onClick={() => handleNavClick('details')}
                    >
                        Contest Details
                    </div>
                    <div
                        className={`mini-nav-item ${activeSection === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => handleNavClick('leaderboard')}
                    >
                        Leaderboard
                    </div>
                    <div
                        className={`mini-nav-item ${activeSection === 'rewards' ? 'active' : ''}`}
                        onClick={() => handleNavClick('rewards')}
                    >
                        Rewards
                    </div>
                </div>
            </div>
            <div>
                {activeSection === 'details' && (
                    <div className='contestdetailscontent'>
                        <span>Contest Details:</span>
                        <div>
                            <ul><li>Description:</li></ul>
                            <p>{quizData.description}</p>
                        </div>
                        <div>
                            <ul><li>Rules & Regulations:</li></ul>
                            {
                                <ol type='Number'>
                                    {quizData.rules && Object.values(quizData.rules).map((rule, idx) => (
                                        <li key={idx}>{rule}</li>
                                    ))}
                                </ol>
                            }
                        </div>
                    </div>
                )}
                {activeSection === 'leaderboard' && (
                    <div>
                    </div>
                )}
                {activeSection === 'rewards' && (
                    <div className='rewards'>
                        {quizData.rewards && Object.values(quizData.rewards).map((reward, idx) => (
                            <img key={idx} src={reward} alt={`Reward ${idx + 1}`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestDetails;
