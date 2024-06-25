import React, { useState, useEffect } from "react";
import "./Allcontest.scss";
import down from "../../assets/Questionsimages/down.png";
import ContestData from "../../components/contestdata/ContestData.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import axios from "axios";

const Allcont = () => {
  const getItemsPerPage = () => {
    return window.innerWidth > 768 ? 12 : 5;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
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
              quiz.status = "Expired";
            }

            return quiz;
          });

          setQuizzes(updatedQuizzes);
          setFilteredQuizzes(updatedQuizzes);
        } else {
          console.log("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    getQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [category, status]);

  const filterQuizzes = () => {
    let newFilteredQuizzes = quizzes;

    if (category !== "All") {
      newFilteredQuizzes = newFilteredQuizzes.filter(
        (quiz) => quiz.category === category
      );
    }

    if (status !== "All") {
      newFilteredQuizzes = newFilteredQuizzes.filter(
        (quiz) => quiz.status === status
      );
    }

    setFilteredQuizzes(newFilteredQuizzes);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setShowCategoryDropdown(false);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setShowStatusDropdown(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuizzes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="Allcontest">
        <div className="Allcontestcontent">
          <div className="Allcontestcontentheading">
            <h1 className="heading">Upcoming Contest</h1>
          </div>
          <div className="Allcontestcontentpharagraph">
            <p>
              Challenge yourself with our expertly crafted quizzes and compete
              with fellow learners from around the globe.
            </p>
          </div>
        </div>
        <div className="Allcontestbuttons">
          <button
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              if (showStatusDropdown) setShowStatusDropdown(false);
            }}
          >
            Category
            <span>
              <img src={down} alt="" />
            </span>
          </button>
          {showCategoryDropdown && (
            <div className="dropdown category-dropdown">
              {["All", "Coding", "Design", "Aptitude", "Development", "AI/ML", "Cybersecurity", "Blockchain", "Web3", "AR/VR", "DevOps"].map((availableCategory) => (
                <label key={availableCategory}>
                  <input
                    type="checkbox"
                    checked={category === availableCategory}
                    onChange={() => handleCategoryChange(availableCategory)}
                  />
                  {availableCategory}
                </label>
              
              ))}
 
            </div>
          )}
          <button
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              if (showCategoryDropdown) setShowCategoryDropdown(false);
            }}
          >
            Status
            <span>
              <img src={down} alt="" />
            </span>
          </button>
          {showStatusDropdown && (
            <div className="dropdown status-dropdown">
              <label>
                <input
                  type="checkbox"
                  checked={status === "All"}
                  onChange={() => handleStatusChange("All")}
                />
                All
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={status === "Live"}
                  onChange={() => handleStatusChange("Live")}
                />
                Live
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={status === "Expired"}
                  onChange={() => handleStatusChange("Expired")}
                />
                Expired
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={status === "Upcoming"}
                  onChange={() => handleStatusChange("Upcoming")}
                />
                Upcoming 
              </label>
            </div>
          )}
        </div>
        <div className="AllContests">
          {currentItems.map((quiz) => (
            <ContestData key={quiz._id} contest={quiz} />
          ))}
        </div>
        <Stack spacing={5} className="pagination">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            sx={{
              color: "black",
              "& .MuiPaginationItem-root": {
                border: "1px solid #A7D7D5",
                backgroundColor: "inherit",
              },
              "& .Mui-selected": {
                backgroundColor: "#08AAA2",
                color: "black",
                "&:hover": {
                  backgroundColor: "#08AAA2",
                },
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#56AFB2",
                  },
                }}
              />
            )}
          />
        </Stack>
      </div>
    </>
  );
};

export default Allcont;
