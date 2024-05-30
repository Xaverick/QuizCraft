import React, { useState } from 'react';
import './ContestDetails.scss';
import Contestdata from '../../assets/data/Contestdata';
import Commoncd from '../../components/commonContestDetail/Commoncd';
import { useParams } from 'react-router-dom';
const ContestDetails = () => {
    const [activeSection, setActiveSection] = useState('details');

    const handleNavClick = (section) => {
        setActiveSection(section);
    };
    const { contestId } = useParams();
    const contest = Contestdata.find(c => c.id === parseInt(contestId));

    if (!contest) {
        return <div>Contest not found</div>;
    }
    return (
        <div className="contestdetailspage">
            <div className='contestdetailspart-1'>
                <div>
                    {/* {Contestdata.map((data) => (
                        <Commoncd key={data.id} data={data} />
                    ))} */}
                    <Commoncd data={contest} />
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
                            <p>{contest.desciption}</p>
                        </div>
                        <div>
                            <ul><li>Rules & Regulations:</li></ul>
                            {
                                <ol type='Number'>
                                    {Object.values(contest.rules).map((rule, idx) => (
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
                        {Object.values(contest.rewards).map((reward, idx) => (
                            <img key={idx} src={reward} alt={`Reward ${idx + 1}`} />
                        ))}
                    </div>

                )}

            </div>
        </div>
    );
};

export default ContestDetails;
