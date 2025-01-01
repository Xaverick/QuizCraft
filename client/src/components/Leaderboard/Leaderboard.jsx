/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Leaderboard.scss";

//icons
import SEARCH from "./assets/search.svg"
import userImage from "../../assets/leaderboard/userImg.svg";
import rank1 from "../../assets/leaderboard/rank1.svg";
import rank2 from "../../assets/leaderboard/rank2.svg";
import rank3 from "../../assets/leaderboard/rank3.svg";
import countryCodeMap from "../../Constants/Country";

const leaderboardData = [
  {
    rank: 4,
    username: "Avantika",
    country: "India",
    totalQuiz: 35,
    rating: 392,
  },
  {
    rank: 5,
    username: "Edward",
    country: "Nigeria",
    totalQuiz: 32,
    rating: 390,
  },
  { rank: 6, username: "Natalie", country: "USA", totalQuiz: 30, rating: 279 },
  { rank: 7, username: "Harvey", country: "UK", totalQuiz: 30, rating: 270 },
  { rank: 8, username: "Antonia", country: "USA", totalQuiz: 29, rating: 243 },
  {
    rank: 9,
    username: "Mitchell",
    country: "Nigeria",
    totalQuiz: 25,
    rating: 226,
  },
  { rank: 10, username: "Faye", country: "UK", totalQuiz: 22, rating: 214 },
  { rank: 11, username: "Gustav", country: "Germany", totalQuiz: 21, rating: 200 },
  { rank: 12, username: "Yuki", country: "Japan", totalQuiz: 20, rating: 195 },
  // Additional data for demonstration purposes
  { rank: 13, username: "Alice", country: "UK", totalQuiz: 19, rating: 180 },
  { rank: 14, username: "John", country: "USA", totalQuiz: 18, rating: 175 },
];

const TopCard = ({ name, rank, quiz, country, rating, picture }) => (
  <div className="top-card">
    <div className="top-card-upper">
      <div className="image-username">
        <img src={picture ? picture : userImage} alt={name} />
        <h3>{name}</h3>
      </div>
      <img src={rank} className="rank-badge" />
    </div>
    <div className="details">
      <p>
        Quiz: <span>{quiz}</span>
      </p>
      <p>
        Country: <span>{country}</span>
      </p>
      <p>
        Rating: <span>{rating}</span>
      </p>
    </div>
  </div>
);

const TopCard2 = ({ name, rank, quiz, country, rating, picture }) => (
  <div className="top-card-2">
    <div className="top-card-upper-2">
      <div className="image-username-2">
        <img src={picture} alt={name} />
        <div className="name-rating">
          <h3>{name} {country}</h3>
          <p>Rating {rating}</p>
        </div>
      </div>
      <img src={rank} className="rank-badge" />
    </div>
  </div>
);

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const getShortForm = (country) => {
    const countryEntry = Object.entries(countryCodeMap).find(
      ([name, code]) => name === country
    );
    return countryEntry ? countryEntry[1] : 'unknown';
  };

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('/leaderboard/getLeaderboardResults');
        //console.log(response);
        if (response.data) {
          //console.log(data);
          setLeaderboardData(response.data);
        } else {
          console.error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLeaderboardData();
    //console.log(leaderboardData);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(leaderboardData.length / itemsPerPage)));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = leaderboardData.slice(startIndex, startIndex + itemsPerPage);

  const topThree = leaderboardData.slice(0, 3);
  console.log(topThree);
  const hasEnoughData = leaderboardData.length >= 3;

  return (
    <div className="leaderboard">
      <div className="search-bar">
        <div className="search">
          <img src={SEARCH} alt="search" />
          <input type="text" placeholder="Enter your name to search..." />
        </div>
        <div className="filters">
          <select>
            <option value="all">Country All</option>
            <option value="india">India</option>
            <option value="nigeria">Nigeria</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
          </select>
        </div>
      </div>
      <div className="top-three">
        {hasEnoughData && (
          <>
            <TopCard
              name={topThree[0].username || 'N/A'}
              rank={rank1}
              quiz={topThree[0].totalQuiz}
              country={topThree[0].country || 'N/A'}
              rating={topThree[0].rating}
              picture={topThree[0].picture}
            />
            <TopCard
              name={topThree[1].username || 'N/A'}
              rank={rank2}
              quiz={topThree[1].totalQuiz || 'N/A'}
              country={topThree[1].country || 'N/A'}
              rating={topThree[1].rating}
              picture={topThree[1].picture}
            />
            <TopCard
              name={topThree[2].username || 'N/A'}
              rank={rank3}
              quiz={topThree[2].totalQuiz}
              country={topThree[2].country || 'N/A'}
              rating={topThree[2].rating}
              picture={topThree[2].picture}
            />
          </>
        )}
      </div>

      <div className="top-three-mobile">
        {hasEnoughData && (
          <>
            <TopCard
              name={topThree[0].username || 'N/A'}
              rank={rank1}
              quiz={topThree[0].totalQuiz}
              country={topThree[0].country || 'N/A'}
              rating={topThree[0].rating}
              picture={topThree[0].picture}
            />
            <div className="top-three-mobile-2nd-3rd">
              <TopCard2
                name={topThree[1].username || 'N/A'}
                rank={rank2}
                quiz={topThree[1].totalQuiz}
                country={topThree[1].country || 'N/A'}
                rating={topThree[1].rating}
                picture={topThree[1].picture}
              />
              <TopCard2
                name={topThree[2].username || 'N/A'}
                rank={rank3}
                quiz={topThree[2].totalQuiz}
                country={topThree[2].country || 'N/A'}
                rating={topThree[2].rating}
                picture={topThree[2].picture}
              />
            </div>
          </>
        )}
      </div>
      <div className="scrollable-table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Country</th>
              <th>Total Quiz</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentData.filter(item => item && item.rank >= 4).map((item, index) => (
              <tr key={index}>
                <td>{item.rank || 'N/A'}</td>
                <td>{item.username || 'N/A'}</td>
                <td>
                  <img
                    src={`https://flagcdn.com/w80/${getShortForm(item.country || 'unknown')}.png`}
                    alt={item.country || 'unknown'}
                    style={{ width: '36px' }}
                  />
                </td>
                <td>{item.totalQuiz}</td>
                <td>{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>

        {/* Calculate start and end of the pagination range */}
        {Array.from({ length: 5 }, (_, index) => {
          let startPage = currentPage <= 3 ? 1 : currentPage - 2; // Keep 1-5 for early pages, then move
          const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
          const page = startPage + index;

          if (page <= totalPages) { // Only render valid pages
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </button>
            );
          }
          return null; // Skip rendering if page exceeds total pages
        })}

        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(leaderboardData.length / itemsPerPage)}
        >
          &gt;
        </button>
      </div>

    </div>
  );
};

export default Leaderboard;
