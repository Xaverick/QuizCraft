// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// //styles
// import styles from "./CardContainer.module.css";

// //components
// import ContestData from "../contestdata/ContestData";

// //icons
// import { FaChevronRight } from "react-icons/fa";
// import { BsChevronCompactRight } from "react-icons/bs";

// const CardContainer = ({ type, heading, quizzes, bookmarkedQuizzes }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const filteredQuizzes = quizzes?.filter((quiz) => {
//           if (type === "Upcoming") {
//             return quiz.status === "Live" || quiz.status === "Upcoming";
//           }
//           return quiz.status === type;
//         });
  
//         const sortingFilterData = filteredQuizzes?.sort(
//           (a, b) => new Date(a.startTime) - new Date(b.startTime)
//         );
//         setFilteredData(sortingFilterData);
//         console.log(type, heading)
//       } catch (error) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [quizzes, type]);  // Ensure quizzes are added as a dependency
  

//   const handleClick = () => {
//     navigate(`/contests/${type.toLowerCase()}`);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainContainer}>
//         <div className={styles.header}>
//           <h2 className={styles.heading}>{heading}</h2>
//           <div className={styles.line} />
//           <div className={styles.btnContainer}>
//             <div className={styles.btn} onClick={handleClick}>
//               All {type}
//               <FaChevronRight className={styles.icon} />
//             </div>
//           </div>
//         </div>

//         <div className={styles.cardContainer}>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             filteredData && filteredData
//               .slice(0, 3)
//               .map((quiz, index) => <ContestData key={index} contest={quiz} bookmarkedQuizzes={bookmarkedQuizzes} />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardContainer;


import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardContainer.module.css";
import ContestData from "../contestdata/ContestData";
import { FaChevronRight } from "react-icons/fa";

const CardContainer = forwardRef(({ type, heading, quizzes, bookmarkedQuizzes }, ref) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredQuizzes = quizzes.filter((quiz) => {
          if (type === "Upcoming") {
            return quiz.status === "Live" || quiz.status === "Upcoming";
          }
          return quiz.status === type;
        });

        const sortingFilterData = filteredQuizzes.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        setFilteredData(sortingFilterData);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizzes, type]);

  const handleClick = () => {
    navigate(`/contests/${type.toLowerCase()}`);
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <div className={styles.line} />
          <div className={styles.btnContainer}>
            <div className={styles.btn} onClick={handleClick}>
              All {type}
              <FaChevronRight className={styles.icon} />
            </div>
          </div>
        </div>

        <div className={styles.cardContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredData.length === 0 ? (
            <p>No {type} contests available</p>
          ) : (
            filteredData
              .slice(0, 3)
              .map((quiz, index) => <ContestData key={index} contest={quiz} bookmarkedQuizzes={bookmarkedQuizzes} />)
          )}
        </div>
      </div>
    </div>
  );
});

export default CardContainer;
