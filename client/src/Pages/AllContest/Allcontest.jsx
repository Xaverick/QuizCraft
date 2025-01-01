import React, { useState, useEffect, useRef } from "react";
import "./Allcontest.scss";
import axios from "axios";
import ContestBanner from "../../components/ContestBanner/ContestBanner.jsx";
import CardContainer from "../../components/CardContainer/CardContainer.jsx";

const Allcont = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [bookmarkedQuizzes, setBookmarkedQuizzes] = useState([]);
  const firstCardContainerRef = useRef(null);

  useEffect(() => {


    const fetchBookmarkedQuizzes = async () => {
      try {
        const response = await axios.get("/quiz/bookmarkedQuizzes");
        setBookmarkedQuizzes(response.data);
      } catch (error) {
        console.log(error);
        setBookmarkedQuizzes([]);
      }
    };
    fetchBookmarkedQuizzes();


    const getQuizzes = async () => {
      try {
        const response = await axios.get("/quiz/getAllQuizzes");
        if (response.status === 200) {
          const data = response.data;
          const updatedQuizzes = data.map((quiz) => {
            const now = Date.now();
            const startTime = new Date(quiz.startTime).getTime();
            const endTime = new Date(quiz.endTime).getTime();

            if (startTime < now && endTime > now) {
              quiz.status = "Live";
            } else if (startTime > now) {
              quiz.status = "Upcoming";
            } else if (endTime < now) {
              quiz.status = "Past";
            }

            return quiz;
          });

          setQuizzes(updatedQuizzes);
          // setFilteredQuizzes(updatedQuizzes);
          console.log(updatedQuizzes);
        } else {
          console.log("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    getQuizzes();
  }, []);

  const scrollToFirstCardContainer = () => {
    if (firstCardContainerRef.current) {
      firstCardContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <>
      <ContestBanner quizzes={quizzes} onBannerClick={scrollToFirstCardContainer}/>
      {quizzes.length > 0 ? (
        <>
          <CardContainer 
            ref={firstCardContainerRef} 
            type="Upcoming" 
            heading="Upcoming Contests" 
            quizzes={quizzes} 
            bookmarkedQuizzes={bookmarkedQuizzes} 
          />

          <CardContainer 
            type="Past" 
            heading="Past Contests" 
            quizzes={quizzes} 
            bookmarkedQuizzes={bookmarkedQuizzes}
          />
        </>
      ) : (
        <p>No Contests Available</p>
      )}
    </>
  );
};

export default Allcont;
