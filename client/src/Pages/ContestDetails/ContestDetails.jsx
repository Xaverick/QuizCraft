import { useState, useEffect } from 'react';
import './ContestDetails.scss';
import { useParams } from 'react-router-dom';
import Commoncd from '../../components/commonContestDetail/Commoncd';
import { toast } from 'react-toastify';
import axios from 'axios';
import price1 from '../../assets/Contestimages/price1.png';
import price2 from '../../assets/Contestimages/price2.png'
import price3 from '../../assets/Contestimages/price3.png';
import price4 from '../../assets/Contestimages/price4.png'

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



    return (
        <div className="contestdetailspage">
            <div className='contestdetailspart-1'>
                <div>
                    <Commoncd data={quizData} />
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
                        {/* {quizData.rewards && Object.values(quizData.rewards).map((reward, idx) => (
                            <img key={idx} src={reward} alt={`Reward ${idx + 1}`} />
                        ))} */}
                        <img src={price1}></img>
                        <img src={price2}></img>
                        <img src={price3}></img>
                        <img src={price4}></img>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestDetails;
