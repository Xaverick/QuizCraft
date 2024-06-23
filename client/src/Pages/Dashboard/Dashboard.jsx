import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboard.scss";

// importing images
import Scholar from "../../assets/Dashboard/Scholar.svg";
import Pro from "../../assets/Dashboard/Pro.svg";
import Champion from "../../assets/Dashboard/Champion.svg";
import Hustler from "../../assets/Dashboard/Hustler.svg";
import Beginner from "../../assets/Dashboard/Beginner.svg";

import whatsapp from "../../assets/Dashboard/whatsapp.svg";
import linkedin from "../../assets/Dashboard/linkedin.svg";
import twitter from "../../assets/Dashboard/twitter.svg";
import facebook from "../../assets/Dashboard/facebook.svg";
import instagram from "../../assets/Dashboard/instagram.svg";
import link from "../../assets/Dashboard/link.svg";

const dashboardData = {
  name: "Ritvik Khanna",
  username: "ritvik_XD",
  title: "Champion #22",
  professions: [
    "Software Developer",
    "Game Developer",
    "iOS Developer",
    "App Developer",
    "MLops Engineer",
    "DevOps Engineer",
  ],
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  referralLink: "https://geekcIas.com/signup?ref=ritvik_xd)",
  platformLink: [
    {
      img: linkedin,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ritvikkhanna/",
    },
    {
      img: facebook,
      name: "Facebook",
      link: "https://facebook.com/ritvik_xd",
    },
    {
      img: twitter,
      name: "Twitter",
      link: "https://twitter.com/ritvik_xd",
    },
    {
      img: whatsapp,
      name: "whatsapp",
      link: "https://whatsapp.com/ritvik_xd",
    },
    {
      img: instagram,
      name: "Twitter",
      link: "https://instagram.com/ritvik_xd",
    },
    {
      img: link,
      name: "Link",
      link: "https://ritvik_xd.com",
    },
  ],
};

const Dashboard = () => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(dashboardData.referralLink).then(
      () => {
        alert("Referral link copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <main className="app">
      <Topbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          {/* Add your main content here */}
          <div className="top-heading">
          <h1>Dashboard</h1>
          <p>Edit Profile</p>
          </div>
          {/* upper profile information */}
          <div className="upper">
            <div className="upper-inner">
              <div className="image-username">
                <div className="img-box" />
                <p className="username">{dashboardData.username}</p>
              </div>
              <div className="detail-box">
                <p className="profile-title">{dashboardData.title}</p>
                <p className="previous-session">view previous session</p>
              </div>
              <p className="bio">{dashboardData.text}</p>

              <div className="skills">
                {dashboardData.professions.map((skill, index) => (
                  <Skills skill={skill} key={index} />
                ))}
              </div>

              <div className="platforms">
                {dashboardData.platformLink.map((platform, index) => (
                  <a href={platform.link} key={index}>
                    <img src={platform.img} alt="" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* lower profile information */}
          {/* Badges */}
          <h3>My Badges</h3>
          <div className="badges">
            <div className="badge">
              <img src={Beginner} alt="Beginner" />
              <p>Beginner</p>
            </div>
            <div className="badge">
              <img src={Hustler} alt="Hustler" />
              <p>Hustler</p>
            </div>
            <div className="badge">
              <img src={Scholar} alt="Scholar" />
              <p>Scholar</p>
            </div>
            <div className="badge">
              <img src={Pro} alt="Pro" />
              <p>Pro</p>
            </div>
            <div className="badge">
              <img src={Champion} alt="Champion" />
              <p>Champion</p>
            </div>
          </div>

          <h3>Spread To World and Earn Reward</h3>
          <div className="refferal">
            <p>Share your unique referral link</p>
            <div className="copy-referral">
              <input type="text" value={dashboardData.referralLink} readOnly />
              <button onClick={handleCopyClick}>Copy</button>
            </div>

            <div className="share-now">
              <p>Share Now</p>
              <div className="platforms">
                {dashboardData.platformLink.map((platform, index) => (
                  <a href={platform.link} key={index}>
                    <img src={platform.img} alt="" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

const Skills = ({ skill }) => <p className="skill">{skill}</p>;
