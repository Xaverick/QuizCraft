import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//icons
import logo from "../../assets/homepageimages/GeekClash.svg";
import coin from "../../assets/CoinGeekClash.svg";
import SEARCH from "./assets/search.svg"
import Message from "../../assets/Topbar/Message.svg";
import Notification from "../../assets/Topbar/Notification.svg";

//styles
import "./Topbar.scss";

const Topbar = () => {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState("");
  const [coins, setCoins] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get("/user/profile");
      setdata(response.data);
      setCoins(response.data.coin);
      console.log(response.data);
    };
    getDetails();
  }, []);

  const SearchUser = async () => {
    console.log("user details : " + user);
    try {
      const response = await axios.get("/user/getusers", {
        params: { name: user },
      });
      setuser("");
      const data = response.data.userFullDetails.username;
      console.log(data);
      navigate(`/user/${data}`, {
        state: { userData: response.data.userFullDetails },
      });
    } catch (err) {
      console.log(err);
      alert("User not found");
    }
  };

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <Link to="/">
          <img src={logo} alt="logo" className="topbar-logo" />
        </Link>
        <div className="topbar-search">
          <img src={SEARCH} alt="search" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
          <button type="button" onClick={SearchUser}>
            Search
          </button>
        </div>
      </div>
      <div className="topbar-user">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #f2ba00",
            borderRadius: "50px",
            padding: "6px 16px 6px 6px",
            fontSize: "large",
            backgroundColor: "#fffbea",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "fit-content",
          }}
        >
          <img src={coin} height={30} style={{ marginRight: "8px" }} />
          <span style={{ fontWeight: "600", color: "#d89b00" }}>{coins}</span>
        </div>

        {/* <div className="user-icons"></div> */}
        <a href="/my-profile" className="user-avatar">
          <img src={data.profilePhoto} alt="" className="profile-img" />
        </a>

        <div className="topbar-user-info">
          <span>{data.name}</span>
          <span style={{ fontSize: "small" }}>
            {data.occupation != "undefined" ? data.occupation : ""}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
