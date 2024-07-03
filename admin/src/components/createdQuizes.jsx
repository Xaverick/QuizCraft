import React, { useEffect, useState } from "react";
import AddQuiz from "./AddQuiz";

import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import QuizSlected from "./selectedQuiz";

import { MdDelete } from "react-icons/md";
import { Edit } from "lucide-react";
import EditQuiz from "./EditQuiz";
const CreatedQuizes = () => {
  const [quesionData, setQuestionData] = useState({
    quizId: "",
    text: "",
    type: "text",
    options: [],
    correctOption: "",
  });
  const [editQuiz, setEditQuiz] = useState(false);
  const [addQuiz, setAddQuiz] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.profile);
  const [userQuizes, setUserQuizes] = useState([]);
  const [selectedQuiz, setSelectedQuizes] = useState();
  const [quizId, setquizId] = useState("");
  const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
  const [response2, setResponse] = useState([]);
  const [questions, setQuestionDatas] = useState([]);
  const [initialQuestion, setInitialQuestion] = useState({
    text: "",
    type: "",
    options: [],
    correctOption: "",
  });
  const handleSubmit2 = async (questionId) => {
    console.log(quesionData);
    try {
      const response = await fetch(
        `${apiUrl}/admin/updatequestion/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quesionData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Input added Successfully", data);
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      fetchUserQuizes();
    }
    if (quizId) {
      fetchQuizDetails(quizId);
    }
  }, []);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (quizId) => {
    try {
      const response = await fetch(`${apiUrl}/admin/deletequiz/${quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log("Quiz deleted");
        fetchUserQuizes();
        alert("Quiz deleted successfully");
      } else {
        console.error("Failed to delete quiz. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    } finally {
      setShowConfirmation(false);
    }
  };
  const [noOfInputs, setNoOfInputs] = useState("0");
  const handleInputChange2 = (name, value) => {
    setQuestionData((prevData) => {
      if (name.startsWith("options")) {
        const optionIndex = Number(name.replace("options", ""));
        const updatedOptions = [...prevData.options];
        updatedOptions[optionIndex] = String(value); // Ensure value is a string

        return {
          ...prevData,
          options: updatedOptions,
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleQuizClick = (quizId) => {
    // Fetch and display quiz details when a quiz is clicked
    console.log("id of the quiz is", quizId);
    fetchQuizDetails(quizId);
    setquizId(quizId);
  };

  const fetchUserQuizes = async () => {
    try {
      const adminid = user;
      const response = await fetch(`${apiUrl}/admin/getquizzes/${adminid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setUserQuizes(data);
      } else {
        console.error("Failed to fetch admin Quizes. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch admin Quizes.:", error);
    }
  };

  const handleDeleteQuestion = async (questionid) => {
    try {
      const response = await fetch(
        `${apiUrl}/admin/deletequestion/${questionid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Question deleted");
      } else {
        console.error("Failed to delete question. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const fetchQuizDetails = async (quizId) => {
    const fetchQuestionDetails = async (questionId) => {
      try {
        const response = await fetch(
          `${apiUrl}/admin/getquestion/${questionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuestionDatas((prevData) => [...prevData, data]);
          console.log("Question details -:" + questions);
        } else {
          console.error("Failed to fetch question. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
    };

    try {
      console.log(quizId);
      const response = await fetch(`${apiUrl}/admin/getquiz/${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setQuestionDatas([]);
      setResponse([]);
      const data = await response.json();
      console.log(data);
      setSelectedQuizes(data);
      console.log(selectedQuiz);
      console.log("id of the quiz is", quizId);
      setFormDetailsDialogOpen(true);

      // Fetch and display input details for each input
      data.questions.forEach((question) => {
        console.log(question);
        fetchQuestionDetails(question);
      });

      // Fetch and display response details for each response
      // data.quiz.response.forEach(() => {
      //   fetchResponseDetails(responseId);
      // });
    } catch (error) {
      console.error("Failed to fetch responses:", error);
    }
  };

  return (
    <div className=" flex items-start justify-between w-[100%] h-[100%]">
      <div className="flex bg-white h-[100%] p-4 flex-col w-[25%] overflow-y-auto gap-4 text-white">
        <div className="text-center">
          <h1
            onClick={() => {
              setAddQuiz(true);
              setSelectedQuizes(null);
            }}
            className="text-2xl text-black bg-yellow-300 p-4 rounded-lg font-bold mb-4 cursor-pointer hover:bg-yellow-400"
          >
            Create New Quiz
          </h1>
        </div>

        {userQuizes.map((quiz) => (
          <div
            key={quiz._id}
            className=" border-2 border-black  hover:border-yellow-400 rounded-xl p-2 flex gap-4 flex-row items-center justify-center"
          >
            <div
              onClick={() => {
                setEditQuiz(false), handleQuizClick(quiz._id);
              }}
              className=" p-4 cursor-pointer flex-row rounded-lg bg-white text-black w-[100%] h-[70px] flex items-center justify-between "
            >
              <p className="text-xl font-extrabold">{quiz.title}</p>
              {/* <div>
                {quiz.startTime.substring(5,10)} - {quiz.endTime.substring(5,10)}
                  </div> */}
            </div>

            {showConfirmation && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg w-[50vw] h-[vh] flex justify-center flex-col items-center">
                  <p className="text-lg font-bold mb-4 text-black text-center ">Are you sure you want to delete this quiz? This will delete all <br /> 
                  the responses, the Leaderboard related to it and all the questions</p>
                  <div className="flex justify-end">
                    <button
                      className="text-white bg-red-500 px-4 py-2 rounded mr-2 hover:bg-red-600"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => {
                        handleDelete(quiz._id);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="text-black cursor-pointer"
              onClick={() => {
                setShowConfirmation(true);
  
              }}
            >
              <MdDelete style={{ fontSize: "2rem", color: "orange"}} />

            </div>
          </div>
        ))}
      </div>

      <div className=" w-[75%] h-[100%] border-l-2 border-l-yellow-300 bg-white text-black ">
        {selectedQuiz ? (
          editQuiz ? (
            <EditQuiz setEditQuiz={setEditQuiz} selectedQuiz={selectedQuiz} />
          ) : (
            <QuizSlected
              setEditQuiz={setEditQuiz}
              selectedQuiz={selectedQuiz}
              fetchQuiz={fetchQuizDetails}
              questions={questions}
              quizId={quizId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )
        ) : (
          <AddQuiz setAddQuiz={setAddQuiz} fetchUserQuizes={fetchUserQuizes} />
        )}
      </div>
    </div>
  );
};

export default CreatedQuizes;
