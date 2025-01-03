import React, { useState, useEffect, useRef } from "react";
import photo from "../../assets/homepageimages/homepagephoto.png";
import lightning from "../../assets/homepageimages/Lightning.png";
import Softstar from "../../assets/homepageimages/Softstar.png";
// import photolive from '../../assets/homepageimages/photolive.png';
import { useNavigate } from "react-router-dom";
import questionsData from "../../assets/data/questions.js";
import ContestData from "../../components/contestdata/ContestData.jsx";
import "./Home.scss";
import sample from "../../assets/homepageimages/instant.svg";
import Comment from "../../components/comment/Comment.jsx";
import commentdata from "../../assets/data/commentdata.js";
import Faqcompo from "../../components/faq/faq.jsx";
import faqdata from "../../assets/data/faqs.js";
import axios from "axios";
import img1 from "../../assets/CommunityParters/img1.svg";
import img2 from "../../assets/CommunityParters/img2.svg";
import herobg from "../../assets/homepageimages/homebg.png";
import Marquee from "react-fast-marquee";
import Categories from "../../components/Homepage/Categories/Categories.jsx";
import Ranking from "../../components/Homepage/PlatformOfferingSec3/Ranking.jsx";
import Challenge100 from "../../components/Homepage/PlatformOfferringSec2/Challenges100.jsx";

const Question = ({ questionData, onSelect, isOpen }) => {
  const handleClick = () => {
    onSelect(questionData.id);
  };

  return (
    <div className={`question ${isOpen ? "open" : ""}`} onClick={handleClick}>
      <div className="question-header">
        <div className="question-text">
          <img
            src={questionData.image}
            alt="Question Icon"
            className="question-icon"
          />
          <p>{questionData.question}</p>
        </div>
        <img
          src={isOpen ? questionData.uimag1 : questionData.dimag2}
          alt="Toggle Icon"
          className="toggle-icon"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="question-answer">
        <p>{questionData.answer}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const whyChooseUsRef = useRef(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(questionsData[0]);
  useEffect(() => {
    const getContests = async () => {
      const response = await axios.get("/quiz/getAllQuizzes");

      if (response.status === 200) {
        const data = response.data;
        // console.log(data);
        setContests(data);
      } else {
        console.log("Failed to fetch quizzes");
      }
    };

    getContests();
  }, []);

  const handleViewAllClick = () => {
    navigate("/contests");
  };
  const handleQuestionSelect = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
    const selectedQuestion = questionsData.find((q) => q.id === questionId);
    setSelectedQuestion(selectedQuestion);
  };

  // Only show the first 3 contests initially
  const initialContests = contests.reverse().slice(0, 3);
  const handleExploreNowClick = () => {
    if (whyChooseUsRef.current) {
      window.scrollTo({
        top: whyChooseUsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="home">
        <div className="homecontent">
          <div className="homephase1">
            <div className="homephase1left">
              <div className="homephase1left1">
                <p>Compete with Geeks From All Over The World</p>
                <span>
                  <img src={lightning} alt="Lightning Icon" />
                </span>
              </div>
              <h2>
                Geek Clash is your launchpad to a world of friendly competition.
                Challenge yourself in diverse topics, battle it out with fellow
                geeks worldwide, and watch your name climb the leaderboards
                after each contest.
              </h2>
              <div className="homebutton">
                <button onClick={handleExploreNowClick}>Explore Now</button>
              </div>
              <div className="homephase1left2">
                <img src={Softstar} alt="Softstar Icon" />
              </div>
            </div>
            <div className="homephase2left">
              <div className="photobackground"></div>
              <img src={herobg} alt="Homepage Photo" />
            </div>
          </div>
          <div className="homephase3">
            <div className="homephase3content">
              <div className="homephase3contentheading">
                <p> Community Partners</p>
              </div>
              <div className="home-phase3">
                <Marquee className="h-16  " autoFill pauseOnHover gradient>
                  <img src={img1} height="100" width="250" alt="" />
                  <img src={img2} height="100" width="250" alt="" />
                </Marquee>
                {/* <div className="slider">
                  <div className="slide-track">
                    <div className="slide">
                      <img src={img1} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img2} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img1} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img2} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img1} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img2} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img1} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img2} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img1} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={img2} height="100" width="250" alt="" />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div>
            <Categories />
          </div>

          <div className="homephase4" ref={whyChooseUsRef}>
            <div className="homephase4heading">
              <p>Platform Offerings</p>
            </div>

            {/* **************************************************** */}
            {/* Pending  */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Challenge100 />
              <Ranking />
            </div>
            {/* **************************************************** */}

            <div className="homephase5">
              <div className="homephase5heading">
                <p>Upcoming Contests</p>
              </div>
              <div className="homephase5heading2">
                <button onClick={handleViewAllClick}>View All</button>
              </div>
              <div className="contestdatadetails">
                {initialContests.map((contest) => (
                  <ContestData key={contest._id} contest={contest} />
                ))}
              </div>
            </div>
          </div>
          <div className="homephase6">
            {/* <div className="homephase6content">
              <div className="homephase6content1">
                <p>Instant Results & Global Ranking</p>
              </div>
              <div className="homephase6content2">
                <p>
                  See your results instantly and compare your knowledge with
                  learners worldwide. You can also filter leaderboards to see
                  how you rank within your region.
                </p>
              </div>
              <div className="homephase6content3">
                <div className="homephasecont3image">
                  <img src={sample} alt="" />
                </div>
              </div>
            </div> */}
          </div>
          <div className="homephase7">
            <div className="homephase7content">
              <div className="homephase7heading">
                <p>Testimonials</p>
              </div>
            </div>
            <div className="homephase7comments">
              <div className="comment-slider first-row">
                {commentdata.concat(commentdata).map((c, index) => (
                  <Comment key={index} ca={c} />
                ))}
              </div>
              <div className="comment-slider second-row">
                {commentdata.concat(commentdata).map((c, index) => (
                  <Comment key={index} ca={c} />
                ))}
              </div>
            </div>
          </div>
          <div className="homephase8faq">
            <div className="homephase8faqcontent">
              <div className="homephase8faqheading">
                <p>Frequently Asked Questions</p>
              </div>
              <div className="faqs">
                {faqdata.map((f, index) => (
                  <Faqcompo
                    key={f.id}
                    f={f}
                    isOpen={openIndex == index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
