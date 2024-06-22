import { useState, useEffect } from 'react';
import './ContestDetails.scss';
import { useParams } from 'react-router-dom';
import Commoncd from '../../components/commonContestDetail/Commoncd';
import { toast } from 'react-toastify';
import axios from 'axios';
import price1 from '../../assets/Contestimages/price1.png';
import price2 from '../../assets/Contestimages/price2.png';
import price3 from '../../assets/Contestimages/price3.png';
import price4 from '../../assets/Contestimages/price4.png';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { IoIosArrowDown } from "react-icons/io";


const ContestDetails = () => {
    const [activeSection, setActiveSection] = useState('details');
    const [quizData, setQuizData] = useState({});
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

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

    const [leaderboardData, setLeaderboardData] = useState([]);
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`/quiz/getLeaderboard/${id}`);
                if (response.status === 200) {
                    setLeaderboardData(response.data.ranks);
                }
            } catch (error) {
                console.log('error');
            }
        };
        fetchLeaderboardData();
    }, [id]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return leaderboardData.slice(startIndex, endIndex);
    };

    const totalPage = Math.ceil(leaderboardData.length / itemsPerPage);

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
                        <div className="container-wrap">
                            <section id="leaderboard">
                                <nav className="ladder-nav">
                                    <div className="filters">
                                        <input type="text" id="search-name" className="live-search-box" placeholder=" Enter Your name to search " />
                                    </div>
                                    <div>
                                        <div className="custom-select">
                                            <select className="filter-country">
                                                <option value="">All Countries</option>
                                                <option value="india">India</option>
                                                <option value="usa">USA</option>
                                                <option value="canada">Canada</option>
                                                <option value="uk">UK</option>
                                            </select>
                                            <IoIosArrowDown className="dropdown-icon" />
                                        </div>
                                    </div>
                                </nav>
                                <table id="rankings" className="leaderboard-results" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>Score</th>
                                        </tr>
                                        {getPageData().map((rank, idx) => (
                                            <tr key={idx}>
                                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                                <td>{rank.name}</td>
                                                <td>{rank.country}</td>
                                                <td>{rank.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Stack spacing={5} className='pagination'>
                                    <Pagination
                                        count={totalPage}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        shape="rounded"
                                        variant="outlined"
                                        sx={{
                                            color: 'black',
                                            '& .MuiPaginationItem-root': {
                                                border: '1px solid #A7D7D5',
                                                backgroundColor: 'inherit',
                                            },
                                            '& .Mui-selected': {
                                                backgroundColor: '#08AAA2',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#08AAA2',
                                                },
                                            },
                                        }}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                {...item}
                                                sx={{
                                                    color: 'black',
                                                    '&:hover': {
                                                        backgroundColor: '#56AFB2',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </Stack>
                            </section>
                        </div>
                    </div>
                )}
                {activeSection === 'rewards' && (
                    <div className='rewards'>
                        <img src={price1} alt="Reward 1" />
                        <img src={price2} alt="Reward 2" />
                        <img src={price3} alt="Reward 3" />
                        <img src={price4} alt="Reward 4" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestDetails;
