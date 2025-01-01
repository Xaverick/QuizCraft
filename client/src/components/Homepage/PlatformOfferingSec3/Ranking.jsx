import React from "react";
import styles from "./Ranking.module.css";

import leaderboard from "../../../assets/homepageimages/Leaderboard (3) 1.svg";

const Ranking = () => {
  return (
    <div className={styles.container}>
      {/* left section */}
      <div className={styles.leftContainer}>
        <div>Instant results & global ranking</div>
        <div>
          See your results instantly and compare your knowledge with learners
          worldwide. You can also filter leaderboards to see how you rank within
          your region.
        </div>
        <div>Visit Leaderboard</div>
      </div>
      {/* right section */}
      <div className={styles.rightContainer}>
        <div className={styles.cyanshadow}></div>
        <img
          className="leaderboardImg"
          src={leaderboard}
          alt="leaderboard_img"
        />
        <div className={styles.cyanshadow2}></div>
      </div>
    </div>
  );
};

export default Ranking;
