import React from "react";
import styles from "./ContestBanner.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";

//assets
import Group from "../../assets/Contestimages/Group.svg";
import tr from "../../assets/Contestimages/tr.png";
import typing from "../../assets/Contestimages/typing.png";
import BLOG from "../../assets/Contestimages/BlogBackground.jpeg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  // console.log(date.toLocaleDateString("en-US", options));
  return date.toLocaleDateString("en-US", options);
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  // console.log(`${hours}:${minutesStr} ${ampm}`);
  return `${hours}:${minutesStr} ${ampm}`;
};

const formatTimeRange = (startTime, endTime) => {
  const startFormatted = formatTime(startTime);
  const endFormatted = formatTime(endTime);
  return `${startFormatted} - ${endFormatted}`;
};

// const getLatestContest = (quizzes) => {
//   if (!Array.isArray(quizzes) || quizzes.length === 0) {
//     return null;
//   }

//   const sortedQuizzes = quizzes.sort(
//     (a, b) => new Date(b.startTime) - new Date(a.startTime)
//   );

//   console.log("Sorted Quizzes: ", sortedQuizzes);

//   return sortedQuizzes[0];
// };

const getLatestContest = (quizzes) => {
  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return null;
  }

  const upcomingQuizzes = quizzes.filter((quiz) => quiz.status === "Upcoming");

  const sortedQuizzes = upcomingQuizzes.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );


  return sortedQuizzes[0];
};

const ContestBanner = ({ quizzes, onBannerClick }) => {
  const latestQuiz = getLatestContest(quizzes);

  const upcomingContestDate = formatDate(latestQuiz?.startTime);
  const upcomingContestTimeRange = formatTimeRange(
    latestQuiz?.startTime,
    latestQuiz?.endTime
  );


  return (
    <div className={styles.container}>
      <div className={styles.maincontainer}>
        {/* challenges section */}
        <div className={styles.challenges} >
          <div className={styles.challengesLeft}>
            <div className={styles.text}>
              <h1 className={styles.challengesHeading}>
                  Participate to Win Badges   
              </h1>
              <p className={styles.challengesText}>
                Challenge yourself with our expertly crafted contests and compete against others to win badges.
              </p>
            </div>
            <div className={styles.roadmapbtn} onClick={onBannerClick}>Get Started &gt;</div>
          </div>

          <div className={styles.star}>
            <div className={styles.imgcontainer}>
              <img src={Group} />
            </div>
          </div>
        </div>

        <div className={styles.bannerRight}>
          {/* upcoming contest and blog section */}
          <div className={styles.upcomingContest} onClick={onBannerClick}>
            <div className={styles.upcomingContestHeading}>
              Upcoming Contest
            </div>
            {latestQuiz ? (
            <div className={styles.participates}>
              <div className={styles.dateTime}>
                <span className={styles.date}>{upcomingContestDate}</span>
                <span className={styles.timing}>
                  {upcomingContestTimeRange}
                </span>
              </div>
              <div className={styles.joined}>
                <div className={styles.contesttotalregistered}>
                    <div className={styles.contestavatarsindiviual}>
                      <img src={latestQuiz.User_profile_Image[0] ? latestQuiz.User_profile_Image[0] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="1" className={styles.contestavatar}/>
                      <img src={latestQuiz.User_profile_Image[1] ? latestQuiz.User_profile_Image[1] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="2" className={styles.contestavatar}/>
                      <img src={latestQuiz.User_profile_Image[2] ? latestQuiz.User_profile_Image[1] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="2" className={styles.contestavatar}/>
                    </div>
                    <span>
                        {latestQuiz.totalRegistered > 0
                          ? `+${latestQuiz.totalRegistered} Joined`
                          : `${latestQuiz.totalRegistered} Joined`}
                      </span>
                  </div>
              </div>
            </div>
            ) : (
              <h1 className={styles.noContestTest}>No Upcoming Contest</h1>
            )}
          </div>



          {/* blog section */}

          <div className={styles.blogs}>
            <div className={styles.blogTextContainer}>
              <p>Mastering UI/UX in 30 Days</p>

              <div className={styles.blogbtn}>
                <NavLink className={styles.navlink} to="/blogs">
                  Read More &gt;
                </NavLink>
              </div>
            </div>

            <div className={styles.imageLaptop}>
              <img src={typing} className={styles.typingLaptop}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestBanner;
