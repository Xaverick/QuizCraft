import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Dashboard.scss";
// import { FaTrophy, FaTachometerAlt, FaHistory, FaCog } from "react-icons/fa";
import dashboard from "../../assets/bottombar/dashboard2.svg";
import history from "../../assets/bottombar/history.svg";
import setting from "../../assets/bottombar/setting.svg";
import leaderboard from "../../assets/bottombar/leaderboard0.svg";
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
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import ShareModal from "../../components/SharePost/ShareModal";
import premiumBadge from "../../assets/badges/premium.png";
import verifiedBadge from "../../assets/badges/verified.png";

const allBadges = [
  { badgeimg: Beginner, badgeName: "Newbie", threshold: 50 },
  { badgeimg: Hustler, badgeName: "Hustler", threshold: 200 },
  { badgeimg: Pro, badgeName: "Maverick", threshold: 400 },
  { badgeimg: Scholar, badgeName: "Wizard", threshold: 800 },
  { badgeimg: Champion, badgeName: "Gladiator", threshold: 1200 },
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [links, setLinks] = useState([]);
  const [badge, setBadge] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get("/user/profile");
      setDashboardData(response.data);
      // console.log("user data: -", response.data);
      setLinks(response.data.platformLink);
    };
    getDetails();
  }, []);

  useEffect(() => {
    let newBadge = [];
    allBadges.forEach((badge) => {
      if (dashboardData.rating >= badge.threshold) {
        newBadge.push(badge);
      }
    });
    setBadge(newBadge);
    if (newBadge.length !== 0) {
      dashboardData.title =
        newBadge[newBadge.length - 1].badgeName + " #" + dashboardData.rating;
    } else {
      dashboardData.title = "#unranked";
    }
  }, [dashboardData]);

  const referralLink = `${import.meta.env.VITE_FRONTEND_URL}/signup?ref=${dashboardData.referralCodeString
    }`;

  const platformLinks = [
    {
      img: linkedin,
      name: "LinkedIn",
      link: links[2],
    },
    {
      img: twitter,
      name: "Twitter",
      link: links[1],
    },
    {
      img: instagram,
      name: "Instagram",
      link: links[0],
    },
    {
      img: link,
      name: "Link",
      link: links[3],
    },
  ];

  const user = [
    {
      img: linkedin,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/",
    },
    {
      img: facebook,
      name: "Facebook",
      link: "https://facebook.com/",
    },
    {
      img: twitter,
      name: "Twitter",
      link: "https://twitter.com/",
    },
    {
      img: whatsapp,
      name: "whatsapp",
      link: "https://whatsapp.com/",
    },
    {
      img: instagram,
      name: "Twitter",
      link: "https://instagram.com/",
    },
  ];

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => {
        alert("Referral link copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleShareClick = (badge) => {
    setSelectedBadge({ ...badge, badgeimg: badge.badgeimg.split("/").pop() });
    setIsModalOpen(true);
  };
  return (
    <main className="app">
      <Topbar />
      <div className="mainDashboard">
        <Sidebar />
        <div
          className="contentDashboard"
          style={{
            padding: "0 10px",
            width: "-webkit-fill-available",
          }}
        >
          <div className="top-heading" style={{ padding: "0 5px" }}>
            <h1>Dashboard</h1>
            <Link to="/my-profile" className="edit-profile">
              <p>Edit Profile</p>
            </Link>
          </div>

          <div className="upper">
            <div className="upper-inner">
              <div className="image-username">
                <div className="img-box">
                  <img
                    src={
                      dashboardData.profilePhoto ||
                      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                    }
                  />
                </div>
                <div className="usernameContainer">
                  <div className="name-username">
                    <p className="name">{dashboardData.name}
                      {dashboardData.verificationBadge && <img className="badge" src={verifiedBadge} alt="verified" />}
                      {dashboardData.premiumBadge && <img className="badge" src={premiumBadge} alt="verified" />}
                    </p>

                    <p className="username">
                      {dashboardData.username || "@username"}

                    </p>
                  </div>
                  <div className="detail-box">
                    <p className="profile-title">{dashboardData.title}</p>
                    <p className="previous-session">
                      View Previous Seasons <FaArrowRight />
                    </p>
                  </div>
                  <p className="bio" style={{ margin: "0px", marginTop: "5px" }}>
                    {dashboardData.text || "Write your Bio"}
                  </p>

                  <div className="platforms">
                    {platformLinks.map((platform, index) => (
                      <a href={platform.link} key={index} className="social-link">
                        <img src={platform.img} alt={platform.name} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="skills">
                {dashboardData.professions &&
                  dashboardData.professions.map((skill, index) => (
                    <Skills skill={skill} key={index} />
                  ))}
              </div>

            </div>
          </div>

          {/* Badges section */}
          <h3 className="heading" >My Badges</h3>
          <div className="badges" style={{ padding: "0 6px" }}>
            {allBadges.map((badgeItem, index) => {
              const isActive = dashboardData.rating >= badgeItem.threshold;
              // const isActive = true;
              // return (
              //   <div className="badge" key={index}>
              //     <img
              //       src={badgeItem.badgeimg}
              //       alt={badgeItem.badgeName}
              //       style={{ filter: isActive ? "none" : "grayscale(100%)" }}
              //     />
              //     <p>{badgeItem.badgeName}</p>
              //   </div>
              // );
              return (
                <div
                  className="badge"
                  key={index}
                  style={{ position: "relative" }}
                >
                  <div
                    className="badge-image-container"
                    onMouseEnter={() => setHoveredBadge(badgeItem)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={badgeItem.badgeimg}
                      alt={badgeItem.badgeName}
                      style={{ filter: isActive ? "none" : "grayscale(100%)" }}
                    />
                    {isActive && hoveredBadge === badgeItem && (
                      <div
                        className="share-icon"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(4, 179, 159, 0.3)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleShareClick(badgeItem)}
                      >
                        <FaShareAlt size={24} />
                      </div>
                    )}
                  </div>
                  <p>{badgeItem.badgeName}</p>
                </div>
              );
            })}
          </div>
          <h3 className="heading">
            Spread To World and Earn Reward
          </h3>
          <div
            className="refferal"
          >
            <p>Share your unique referral link</p>
            <div className="copy-referral">
              <input type="text" value={referralLink} readOnly />
              <button
                onClick={handleCopyClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <FaCopy />
                Copy
              </button>
            </div>
            <div className="share-now" >
              <p>Share Now</p>
              <div className="platforms" style={{justifyContent: "left"}}>
                {user.map((platform, index) => (
                  <a href={platform.link} key={index}>
                    <img src={platform.img} alt={platform.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-navbar">
        <Link to="/dashboard">
          <img src={dashboard} alt="" />
          <span>Dashboard</span>
        </Link>
        <Link to="/leaderboard">
          <img src={leaderboard} alt="" />

          <span>Leaderboard</span>
        </Link>
        <Link to="/comingsoon">
          <img src={history} alt="" />
          <span>History</span>
        </Link>
        <Link to="/my-profile">
          <img src={setting} alt="" />
          <span>Settings</span>
        </Link>
      </div>
      {isModalOpen && (
        <ShareModal
          badge={selectedBadge}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default Dashboard;

const Skills = ({ skill }) => <p className="skill">{skill}</p>;
