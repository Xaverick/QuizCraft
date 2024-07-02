import React ,{useEffect, useState } from "react";
import logo from "../../assets/homepageimages/GeekClash.svg";
import Message from "../../assets/Topbar/Message.svg";
import Notification from "../../assets/Topbar/Notification.svg";
import './Topbar.scss';
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
 
const Topbar = () => {
  const [data,setdata] = useState([]);
  const [user,setuser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get('/user/profile');
      setdata(response.data);
    }
    getDetails();
  },[])
    
    const SearchUser = async () => {
      console.log("user details : "+user);
      const response = await axios.get('/user/getusers',{params:{name:user}});
      setuser('');
      const data = response.data.userFullDetails.username;
      console.log(data);
      navigate(`/user/${data}`,{ state: { userData:response.data.userFullDetails} });
    }

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <Link to='/'><img src={logo} alt="logo" className="topbar-logo" /></Link>
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Enter Username"
            className="search-input"
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
          <button type="button" onClick={SearchUser}>Search</button>
        </div>
      </div>
      <div className="topbar-user">
        <div className="user-icons">
          {/* <div className="icon-wrapper">
            <div className="icon-badge" />
            <img src={Notification} alt="Notification" />
          </div> */}
        </div>
        <div className="user-avatar" >
          <img src={data.profilePhoto} alt="" />
        </div>
 
        <div className="topbar-user-info">
          <span>{data.name}</span>
          <span>{data.occupation}</span>
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
