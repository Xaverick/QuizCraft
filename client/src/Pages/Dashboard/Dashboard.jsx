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


const Dashboard = () => {

  const [dashboardData, setdashboardData] = useState([]);
  const [badge, setBadge] = useState([]);
  //fetching the data from the backend
  useEffect(() => {
    const getdetails = async () => {
      const response = await axios.get('/user/profile')
      setdashboardData(response.data);
    }
    getdetails();
  }, []);
  //critera to decide the badges and then alot the badges to the user
  useEffect(() => {
    let newBadge = [];
    if (dashboardData.rating >= 0) {
      newBadge.push([{ badgeimg: Beginner, badgeName: "Beginner" }]);
    }
    if (dashboardData.rating >= 200) {
      newBadge.push([{ badgeimg: Hustler, badgeName: "Hustler" }]);
    }
    if (dashboardData.rating >= 400) {
      newBadge.push([{ badgeimg: Champion, badgeName: "Champion" }]);
    }
    if (dashboardData.rating >= 700) {
      newBadge.push([{ badgeimg: Scholar, badgeName: "Scholar" }]);
    }
    if (dashboardData.rating >= 1200) {
      newBadge.push([{ badgeimg: Pro, badgeName: "Pro" }]);
    }
    setBadge(newBadge);
    if (badge.length != 0) {
      dashboardData.title = newBadge[newBadge.length - 1][0].badgeName + " #" + dashboardData.rating;
    }
  }, [dashboardData]);

  //the data is saved on temporary basis in the dashboardData object otherwise it will be fetched from the Db
  dashboardData.platformLink = [
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
    }]

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
            <Link to='/my-profile'><p>Edit Profile</p></Link>
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
                {/* if professions are not added then will be blank */}
                {dashboardData.professions && dashboardData.professions.map((skill, index) => (
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
            {badge.map((badgeitem, index) => {
              return (<div className="badge" key={index}>
                {/* {console.log(badgeitem[index].badgeName)} */}
                <img src={badgeitem[0].badgeimg} alt={badgeitem[0].badgeName} />
                <p>{badgeitem[0].badgeName}</p>
              </div>)
            })}
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
