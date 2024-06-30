import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCopy } from "react-icons/fa";

const allBadges = [
  { badgeimg: Beginner, badgeName: "Beginner", threshold: 0 },
  { badgeimg: Hustler, badgeName: "Hustler", threshold: 200 },
  { badgeimg: Pro, badgeName: "Pro", threshold: 1200 },
  { badgeimg: Scholar, badgeName: "Scholar", threshold: 700 },
  { badgeimg: Champion, badgeName: "Champion", threshold: 400 },
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [links, setLinks] = useState([]);
  const [badge, setBadge] = useState([]);
  
  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get('/user/profile');
      setDashboardData(response.data);
      setLinks(response.data.platformLink);
    };
    getDetails();
  }, []);

  useEffect(() => {
    let newBadge = [];
    allBadges.forEach(badge => {
      if (dashboardData.rating >= badge.threshold) {
        newBadge.push(badge);
      }
    });
    setBadge(newBadge);
    if (newBadge.length !== 0) {
      dashboardData.title = newBadge[newBadge.length - 1].badgeName + " #" + dashboardData.rating;
    }
  }, [dashboardData]);

  const referralLink = `${import.meta.env.VITE_FRONTEND_URL}/signup?ref=${dashboardData.referralCodeString}`;

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
    }
  ];

  const user = [
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

  return (
    <main className="app">
      <Topbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="top-heading">
            <h1>Dashboard</h1>
            <Link to='/my-profile' className="edit-profile"><p>Edit Profile</p></Link>
          </div>
          <div className="upper">
            <div className="upper-inner">
              <div className="image-username">
                <div className="img-box">
                  <img src={dashboardData.profilePhoto || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} />
                </div>
                <div className="name-username">
                  <p className="name">{dashboardData.name} </p>
                  <p className="username">{dashboardData.username || '@ritvik_xd'}</p>
                </div>
              </div>
              <div className="detail-box">
                <p className="profile-title">{dashboardData.title}</p>
                <p className="previous-session">view previous season <FaArrowRight /></p>
              </div>
              <p className="bio">{dashboardData.text || 'Write your Bio'}</p>
              <div className="skills">
                {dashboardData.professions && dashboardData.professions.map((skill, index) => (
                  <Skills skill={skill} key={index} />
                ))}
              </div>
              <div className="platforms">
                {platformLinks.map((platform, index) => (
                  <a href={platform.link} key={index}>
                    <img src={platform.img} alt={platform.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <h3>My Badges</h3>
          <div className="badges">
            {allBadges.map((badgeItem, index) => {
              const isActive = dashboardData.rating >= badgeItem.threshold;
              return (
                <div className="badge" key={index}>
                  <img
                    src={badgeItem.badgeimg}
                    alt={badgeItem.badgeName}
                    style={{ filter: isActive ? 'none' : 'grayscale(100%)' }}
                  />
                  <p>{badgeItem.badgeName}</p>
                </div>
              );
            })}
          </div>
          <h3 style={{ marginBottom: '-1rem' }}>Spread To World and Earn Reward</h3>
          <div className="refferal">
            <p>Share your unique referral link</p>
            <div className="copy-referral">
              <input type="text" value={referralLink} readOnly />
              <button onClick={handleCopyClick} style={{
                display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: '5px'
              }}><FaCopy />Copy</button>
            </div>
            <div className="share-now">
              <p>Share Now</p>
              <div className="platforms">
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
    </main>
  );
};

export default Dashboard;

const Skills = ({ skill }) => <p className="skill">{skill}</p>;
