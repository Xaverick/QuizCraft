import React, { useEffect, useState  } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../Dashboard/Dashboard.scss";

// importing images
import Scholar from "../../assets/Dashboard/Scholar.svg";
import Pro from "../../assets/Dashboard/Pro.svg";
import Champion from "../../assets/Dashboard/Champion.svg";
import Hustler from "../../assets/Dashboard/Hustler.svg";
import Beginner from "../../assets/Dashboard/Beginner.svg";
import { useLocation } from 'react-router-dom';
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
  { badgeimg: Beginner, badgeName: "Newbie", threshold: 50 },
  { badgeimg: Hustler, badgeName: "Hustler", threshold: 200 },
  { badgeimg: Pro, badgeName: "Maverick", threshold: 400 },
  { badgeimg: Scholar, badgeName: "Wizard", threshold: 800 },
  { badgeimg: Champion, badgeName: "Gladiator", threshold: 1200 },
];

const ReqProfile = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [links, setLinks] = useState([]);
  const [badge, setBadge] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const getDetails = async () => {
        if(location.state.userData){
            const response = location.state.userData
            location.state.userData = null;
            setDashboardData(response);
        }
    };
    getDetails();
  }, [location.state.userData]);
  

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
    }else{
      dashboardData.title = "#unranked";

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

  return (
    <main className="app">
      <Topbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="top-heading">
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
                <p className="previous-session">view previous seasons <FaArrowRight /></p>
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
        </div>
      </div>
    </main>
  );
};

export default ReqProfile;
const Skills = ({ skill }) => <p className="skill">{skill}</p>;
