import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./MyContests.module.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

// icons
import { FaChevronRight } from "react-icons/fa";

const MyContests = () => {
  const [selectedTab, setSelectedTab] = useState("Your Contests");
  const [yourContests, setYourContests] = useState([]);
  const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        console.log("fetching");
        const yourContestsResponse = await axios.get("/quiz/yourQuizzes");
        const bookmarkedQuizzesResponse = await axios.get("/quiz/bookmarkedQuizzes");

        setYourContests(yourContestsResponse.data);
        setBookmarkedQuizzes(bookmarkedQuizzesResponse.data);
        console.log(yourContestsResponse.data);
        console.log(bookmarkedQuizzesResponse.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const tabs = [
    {
      id: 1,
      name: "Your Contests",
    },
    {
      id: 2,
      name: "Bookmarked",
    },
  ];

  const handleClick = (id) => {
    navigate(`/contest/${id}`);
  };

  return (
    <div className={styles.mainContainer}>
      <Topbar />
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.contestSection}>
          <div className={styles.contestType}>
            {tabs.map((tab) => (
              <div
                className={`${
                  selectedTab === tab.name ? styles.active : styles.tab
                }`}
                key={tab.id}
                onClick={() => setSelectedTab(tab.name)}
              >
                {tab.name}
                {selectedTab === tab.name && (
                  <div className={styles.line}></div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.yourContests}>
            <div className={styles.conteststatus}>
              <div>Contest</div>
              <div>Status</div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : selectedTab === "Your Contests" ? (
              yourContests.map((quiz) => (
                <div
                  className={
                    quiz.id % 2 === 1
                      ? styles.contestlist
                      : styles.borderBlue
                  }
                  key={quiz.id}
                >
                  <div className={styles.contestName}>{quiz.title}</div>
                  <div
                    className={
                      quiz.status === "Attempted"
                        ? styles.attempted
                        : styles.nonAttempted
                    }
                  >
                    {quiz.status}
                  </div>
                  <FaChevronRight className={styles.rightArrow}  onClick={() => handleClick(quiz.id)} />
                </div>
              ))
            ) : (
              bookmarkedQuizzes.map((quiz) => (
                <div
                  className={
                    quiz.id % 2 === 1
                      ? styles.contestlist
                      : styles.borderBlue
                  }
                  key={quiz.id}
                >
                  <div className={styles.contestName}>{quiz.title}</div>
                  <div
                    className={
                      quiz.status === "Attempted"
                        ? styles.attempted
                        : styles.nonAttempted
                    }
                  >
                    {quiz.status}
                  </div>
                  <FaChevronRight className={styles.rightArrow} onClick={() => handleClick(quiz.id)} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContests;
