import { Link } from "react-router-dom";

//styles
import "./Leaderboard.scss";

//components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

//icons
import dashboard from "../../assets/bottombar/dashboard.svg";
import history from "../../assets/bottombar/history.svg";
import setting from "../../assets/bottombar/setting.svg";
import leaderboard from "../../assets/bottombar/leaderboard.svg";




const Comingsoon = () => {
  return (
    <div className="app">
      <Topbar />
      <div className="mainLeader">
        <Sidebar />
        <div className="contentLeader">
          <div className="top-heading">
            <h1 style={{fontWeight:'bold'}}>Leaderboard</h1>
          </div>
          <Leaderboard />
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
    </div>
  );
};

export default Comingsoon;


