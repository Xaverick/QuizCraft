import React from "react";
import logo from "../../assets/homepageimages/GeekClash.svg";
import Message from "../../assets/Topbar/Message.svg";
import Notification from "../../assets/Topbar/Notification.svg";
import './Topbar.scss';

const Topbar = () => {
  return (
    <nav className="topbar">
      <div className="topbar-left">
        <img src={logo} alt="logo" className="topbar-logo" />
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-user">
        <div className="user-icons">
          <div className="icon-wrapper">
            <div className="icon-badge" />
            <img src={Notification} alt="Notification" />
          </div>
        </div>
        <div className="user-avatar" />
        <div className="topbar-user-info">
          <span>Ritvik Khanna</span>
          <span>UI/UX Designer</span>
        </div>
        <select name="language" id="language-select" className="language-select">
          <option value="">{""}</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
    </nav>
  );
};

export default Topbar;
