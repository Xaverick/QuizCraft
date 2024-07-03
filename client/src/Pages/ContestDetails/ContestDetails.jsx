import { useState, useEffect } from "react";
import "./ContestDetails.scss";
import { useParams } from "react-router-dom";
import Commoncd from "../../components/commonContestDetail/Commoncd";
import { toast } from "react-toastify";
import axios from "axios";
import price1 from "../../assets/Contestimages/price1.png";
import price2 from "../../assets/Contestimages/price2.png";
import price3 from "../../assets/Contestimages/price3.png";
import price4 from "../../assets/Contestimages/price4.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import { IoIosArrowDown } from "react-icons/io";
import { FlagIcon } from "react-flag-kit";
import search from "../../assets/Contestimages/search.svg";
import UserPerformance from "./UserPerformance"; // Import the UserPerformance component

const countryCodeMap = {
  india: "IN",
  "united states": "US",
  canada: "CA",
  germany: "DE",
  france: "FR",
  japan: "JP",
  china: "CN",
  australia: "AU",
  brazil: "BR",
  russia: "RU",
  egypt: "EG",
  ghana: "GH",
  malaysia: "MY",
  pakistan: "PK",
  "new zealand": "NZ",
  nigeria: "NG",
  "republic of ireland": "IE",
  singapore: "SG",
  "south africa": "ZA",
  "united kingdom": "GB",
  // Add more countries as needed
};

const ContestDetails = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [contestGiven, setContestGiven] = useState(false);
  const [quizData, setQuizData] = useState({});
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const registeredQuizzes =
    JSON.parse(localStorage.getItem("user"))?.registeredQuizzes || [];
  const isRegistered = registeredQuizzes.includes(id);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceData, setPerformanceData] = useState(null); // Add state for performance data
  const [contestMessage, setContestMessage] = useState(""); // Add state for performance data

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/quiz/getQuiz/${id}`);
        if (response.status === 200) {
          console.log("quiz data: ",response.data);
          setQuizData(response.data.quiz);
          if (response.data.response) {
            setContestGiven(true);
            setPerformanceData(response.data.response); // Set performance data
            setContestMessage(response.data.message);
          }
        } else {
          throw new Error("Failed to fetch quiz data");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        toast.error("Failed to fetch quiz data", {
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
        console.log(response.data.ranks);
        response.data.ranks.sort((a, b) => b.score - a.score);
        if (response.status === 200) {
          setLeaderboardData(response.data.ranks);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchLeaderboardData();
  }, [id]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const getFilteredData = () => {
    let filteredData = leaderboardData;

    if (selectedCountry) {
      filteredData = filteredData.filter(
        (rank) => rank.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((rank) =>
        rank.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  };

  const getPageData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPage = Math.ceil(getFilteredData().length / itemsPerPage);

  return (
    <div className="contestdetailspage">
      <div className="contestdetailspart-1">
        <div>
          <Commoncd
            data={quizData}
            isRegistered={isRegistered}
            given={contestGiven}
          />
        </div>
      </div>
      <div className="mini-nav">
        <div className="mini-nav-items">
          <div
            className={`mini-nav-item ${
              activeSection === "details" ? "active" : ""
            }`}
            onClick={() => handleNavClick("details")}
          >
            Contest Details
          </div>
          <div
            className={`mini-nav-item ${
              activeSection === "leaderboard" ? "active" : ""
            }`}
            onClick={() => handleNavClick("leaderboard")}
          >
            Results
          </div>
          <div
            className={`mini-nav-item ${
              activeSection === "rewards" ? "active" : ""
            }`}
            onClick={() => handleNavClick("rewards")}
          >
            Rewards
          </div>
          {/* <div
                        className={`mini-nav-item ${activeSection === 'performance' ? 'active' : ''}`}
                        onClick={() => handleNavClick('performance')}
                    >
                        Performance
                    </div> */}
        </div>
      </div>
      <div>
        {activeSection === "details" && (
          <div className="contestdetailscontent">
            <span>Contest Details:</span>
            <div>
              <ul>
                <li>Description:</li>
              </ul>
              <p>{quizData.description}</p>
            </div>
            <div>
              <ul>
                <li>Rules & Regulations:</li>
              </ul>
              {
                <ol type="Number">
                  {quizData.rules?.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ol>
              }
            </div>
          </div>
        )}

        {activeSection === "leaderboard" && (
          <div className="leaderboard">
            {performanceData ? (
              <>
                <p style={{ textAlign: "center" }}>{contestMessage}</p>
                <UserPerformance
                  performanceData={performanceData}
                  contestGiven={contestGiven}
                />
              </>
            ) : (
              <></>
            )}
            <div>
                        <div className="container-wrap">
                            <section id="leaderboard">
                                <nav className="ladder-nav">
                                    <div className="filters">
                                        <img src={search} alt="Search" />
                                        <input
                                            type="text"
                                            id="search-name"
                                            className="live-search-box"
                                            placeholder="Enter your name to search"
                                            value={searchTerm}
                                            onChange={handleSearchTermChange}
                                        />
                                    </div>
                                    <div>
                                        <div className="custom-select">
                                            <select className="filter-country" onChange={handleCountryChange} value={selectedCountry}>
                                                <option value="">All Countries</option>
                                                <option value="australia">Australia</option>
                                                <option value="canada">Canada</option>
                                                <option value="egypt">Egypt</option>
                                                <option value="ghana">Ghana</option>
                                                <option value="india">India</option>
                                                <option value="malaysia">Malaysia</option>
                                                <option value="pakistan">Pakistan</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="nigeria">Nigeria</option>
                                                <option value="Republic of Ireland">Republic of Ireland</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="United States">United States</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                            </select>
                                            <IoIosArrowDown className="dropdown-icon" />
                                        </div>
                                    </div>
                                </nav>
                                <table id="rankings" className="leaderboard-results" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Username</th>
                                            <th>Country</th>
                                            <th>Score</th>
                                        </tr>
                                        {getPageData().map((rank, idx) => (
                                            <tr key={idx}>
                                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                                <td>{rank.username}</td>
                                                <td>
                                                    <FlagIcon code={countryCodeMap[rank.country.toLowerCase()]} width={32} />
                                                </td>
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
          </div>
        )}
        {activeSection === "rewards" && (
          <div className='rewards'>
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={price1} alt="Reward 1" />
              <p className="" style={{ textAlign: "center" }}>1st Prize</p>

            </div>
 

          {/* <img src={price1} alt="Reward 1" />
          <img src={price2} alt="Reward 2" />
          <img src={price3} alt="Reward 3" />
          <img src={price4} alt="Reward 4" /> */}
      </div>

        )}
        {/* {activeSection === 'performance' && (
                    <UserPerformance performanceData={performanceData} contestGiven={contestGiven} />
                )} */}
      </div>
    </div>
  );
};

export default ContestDetails;
