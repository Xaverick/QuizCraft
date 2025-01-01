import React from "react";
import styles from "./Challeges100.module.css";

import Day100 from "../../../assets/homepageimages/Group 1171275538.svg";
import maskgroup from "../../../assets/homepageimages/Mask group.svg";

const Challenges100 = () => {
  return (
    <div className={styles.container}>
      {/* left section */}
      <div className={styles.cyanshadow3}> </div>
      <div className={styles.leftContainer}>
        <div>Introducing Challenges, a new way to achieve your goals</div>
        <div>
          Chasing your goals just got easier. With a focus on growth and
          accomplishment, this feature empowers you to turn your goals into
          reality.
        </div>
        <div>Join Chanllenges</div>
      </div>
      {/* right section */}
      {/* <div> */}
      <div className={styles.rightContainer}>
        <div className={styles.lefttt}></div>
        <div className={styles.cyanshadow}></div>
        <div>
          <div className={styles.imagessection}>
            <img src={Day100} alt="leaderboard_img" />
            <img src={maskgroup} />
          </div>
        </div>
        <div className={styles.cyanshadow2}></div>
      </div>
    </div>
  );
};

export default Challenges100;
