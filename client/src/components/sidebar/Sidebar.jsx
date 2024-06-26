import React from "react";
import Dashboard from "../../assets/sidebarImages/Dashboard.svg";
import Leaderboard from "../../assets/sidebarImages/Leaderboard.svg";
import Subscription from "../../assets/sidebarImages/Subscription.svg";
import YourQuiz from "../../assets/sidebarImages/YourQuiz.svg";
import Community from "../../assets/sidebarImages/Community.svg";
import Setting from "../../assets/sidebarImages/Setting.svg";
import Logout from "../../assets/sidebarImages/Logout.svg";
import profile from '../../assets/sidebarImages/profile.webp'
import { Link } from "react-router-dom";

import './Sidebar.scss';

const Menu = [
  {
    link: "My Profile",
    path: "/my-profile",
    icon: profile,
  },
  {
    link: "Dashboard",
    path: "/dashboard",
    icon: Dashboard,
  },
  {
    link: "Leaderboard",
    // path: "/leaderboard",
    icon: Leaderboard,
  },
  {
    link: "Subscription",
    // path: "/subscription",
    icon: Subscription,
  },
  {
    link: "Your Quiz",
    // path: "/your-quiz",
    icon: YourQuiz,
  },
  {
    link: "Community",
    // path: "/community",
    icon: Community,
  },

];

const Account = [
  {
    link: "Setting",
    // path: "/setting",
    icon: Setting,
  },
  {
    link: "Logout",
    // path: "/logout",
    icon: Logout,
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="menu">
        <h3 className="menu-title">Menu</h3>
        <ul className="menu-list">
          {Menu.map((item, index) => (
            <li key={index} className="menu-item">
              <Link to={item.path} className="menu-link">
                <img src={item.icon} alt="icon" className="menu-icon" />
                <span>{item.link}</span>
              </Link>
            </li>

          ))}
        </ul>
      </div>
      <div className="account">
        <h3 className="account-title">Account</h3>
        <ul className="account-list">
          {Account.map((item, index) => (
            <li key={index} className="account-item">
              <img src={item.icon} alt="icon" className="account-icon" />
              <span>{item.link}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
