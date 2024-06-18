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
    navigate("/contest");
  };
  const handleQuestionSelect = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
    const selectedQuestion = questionsData.find((q) => q.id === questionId);
    setSelectedQuestion(selectedQuestion);
  };

  // Only show the first 3 contests initially
  const initialContests = contests.slice(0, 3);
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
              <img src={photo} alt="Homepage Photo" />
            </div>
          </div>
          <div className="homephase3">
            <div className="homephase3content">
              <div className="homephase3contentheading">
                <p>Our Community Partners</p>
              </div>
              <div className="home-phase3">
                <div className="slider">
                  <div className="slide-track">
                    {/* Place your images here */}
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={Softstar} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={Softstar} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                    {/* Repeat the images to create infinite loop */}
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={Softstar} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={Softstar} height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                      <img src={lightning} height="100" width="250" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="homephase4" ref={whyChooseUsRef}>
            <div className="homephase4heading">
              <p>Why Choose Us</p>
            </div>
            <div className="homephase4content">
              <div className="homephase4contentquestions">
                {questionsData.map((question) => (
                  <Question
                    key={question.id}
                    questionData={question}
                    isOpen={openQuestionId === question.id}
                    onSelect={handleQuestionSelect}
                  />
                ))}
              </div>
              <div className="homephase4contentimg">
                {selectedQuestion && (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={selectedQuestion.sideimage}
                    alt="Side Image"
                  />
                )}
              </div>
            </div>
            <div className="homephase5">
              <div className="homephase5heading">
                <p>Upcoming Contest</p>
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
            <div className="homephase6content">
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
            </div>
          </div>
          <div className="homephase7">
            <div className="homephase7content">
              <div className="homephase7heading">
                <p>What our Students say About us</p>
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
