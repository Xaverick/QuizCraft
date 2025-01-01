import React from "react";
import Dashboard from "../../assets/sidebarImages/Dashboard.svg";
import Leaderboard from "../../assets/sidebarImages/Leaderboard.svg";
import Subscription from "../../assets/sidebarImages/Subscription.svg";
import YourQuiz from "../../assets/sidebarImages/YourQuiz.svg";
import Community from "../../assets/sidebarImages/Community.svg";
import Setting from "../../assets/sidebarImages/Setting.svg";
import Logout from "../../assets/sidebarImages/Logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import axios from "axios";

import "./Sidebar.scss";

const Menu = [
  {
    link: "Dashboard",
    path: "/dashboard",
    icon: Dashboard,
  },
  {
    path: "/leaderboard",
    link: "Leaderboard",
    icon: Leaderboard,
  },
  {
    path: "/comingsoon",
    link: "Subscription",
    icon: Subscription,
  },
  {
    path: "/my-contests",
    link: "My Contests",
    icon: YourQuiz,
  },
  {
    path: "/comingsoon",
    link: "Community",
    icon: Community,
  },
];

const Account = [
  {
    link: "Setting",
    icon: Setting,
    path: "/my-profile",
  },
  {
    link: "Logout",
    icon: Logout,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/user/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <aside className="sidebar">
      <div className="menu">
        <h3 className="menu-title">Menu</h3>
        <ul className="menu-list">
          {Menu.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
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
            <li
              key={index}
              className={`account-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              {item.link === "Logout" ? (
                <div className="account-link" onClick={handleLogout}>
                  <img src={item.icon} alt="icon" className="account-icon" />
                  <span>{item.link}</span>
                </div>
              ) : (
                <Link to={item.path} className="account-link">
                  <img src={item.icon} alt="icon" className="account-icon" />
                  <span>{item.link}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
