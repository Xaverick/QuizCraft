import React, { useState, useEffect } from "react";
import htmr from "htmr";
import axios from "axios";
// icons
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import "./ContestData.scss";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/Contestimages/Online_Contest_svg_banner_dark.png";
import tr from "../../assets/Contestimages/tr.png";


const ContestData = ({ contest, bookmarkedQuizzes }) => {

  // const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isLoggedin = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/contest/${contest._id}`);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const handleBookmark = async () => {

    try {
      const response = await axios.post(`/quiz/actionBookmark/${contest._id}`);
      if (response.status === 200) {
        setIsBookmarked(!isBookmarked);
      }

    
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  // useEffect(() => {
  //   const fetchBookmarkedQuizzes = async () => {
  //     try {
  //       const response = await axios.get("/quiz/bookmarkedQuizzes");
  //       setBookmarkedQuizzes(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchBookmarkedQuizzes();
  // }, []);

  useEffect(() => {
    console.log(bookmarkedQuizzes);
    if (bookmarkedQuizzes?.some((quiz) => quiz.id === contest._id)) {
      console.log("bookmarked");
      setIsBookmarked(true);
    } else {
      console.log("not bookmarked");
      setIsBookmarked(false);
    }
  }, [bookmarkedQuizzes, contest._id]);

  return (
    <div className="contest">
      <div className="contestdatabox">
        <div className="contestdataimage" style={{ padding: "10px" }}>
          {contest.status === "Live" && <div className="live">Live</div>}
          <img
            src={contest.image || defaultImage}
            alt={contest.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="contestdatacontent">
          <h3>{contest.title.length > 18 ? `${contest.title.slice(0,18)}...` : contest.title}</h3>
          <div onClick={handleBookmark}>
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </div>
          <p className="description">{htmr(contest.description)}</p>
        </div>
        <div className="contestdatatime">
          <div>
            <p>Event Date</p>
            <h3>{formatDate(contest.startTime)}</h3>
          </div>
          <div className="contesttotalregistered">
            <div>
              <img src={contest.User_profile_Image[0] ? contest.User_profile_Image[0] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="1" className="contestavatar"/>
              <img src={contest.User_profile_Image[1] ? contest.User_profile_Image[1] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="2" className="contestavatar"/>
              <img src={contest.User_profile_Image[2] ? contest.User_profile_Image[2] : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="3" className="contestavatar"/>
            </div>
            <span>
                {contest.totalRegistered > 0
                  ? `+${contest.totalRegistered} Joined`
                  : `${contest.totalRegistered} Joined`}
              </span>
          </div>
        </div>
        <div className="contestdatabutton">
          <button onClick={handleButtonClick}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ContestData;
