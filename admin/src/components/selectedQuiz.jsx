import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const QuizSlected = ({
  selectedQuiz,
  questions,
  quizId,
  fetchQuiz,
  fetchQuizDetails,
  handleQuizClick,
  refresh,
  setRefresh,
  setEditQuiz,
}) => {
  const toast = useToast();

  const [quesionData, setQuestionData] = useState({
    quizId: quizId,
    text: "",
    type: "radio",
    options: [
      {
        text: "",
      },
    ],
    correctOption: "",
  });
  // const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [closeAddQuestion, setCloseAddQuestion] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    text: "",
    type: "",
    options: [],
    correctOption: "",
  });
  const [noOfInputs, setNoOfInputs] = useState(4);
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
        alert("Question Deleted");
        fetchQuiz(quizId);
      } else {
        console.error("Failed to delete question. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleSubmit3 = async () => {
    console.log(quesionData);
    try {
      const response = await fetch(`${apiUrl}/admin/createquestion/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quesionData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Question added Successfully", data);
        quesionData.text = "";
        quesionData.type = "radio";
        quesionData.options = [];
        quesionData.correctOption = "";
        setNoOfInputs(4);
        setCloseAddQuestion(false);
        setQuestionData({
          quizId: quizId,
          text: "",
          type: "radio",
          options: [],
          correctOption: "",
        });

        fetchQuiz(quizId);
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };
  const handleSubmit = async (questionId) => {
    console.log(updatedQuestion);
    try {
      const response = await fetch(
        `${apiUrl}/admin/updatequestion/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuestion),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Question Updated Successfully", data);
        quesionData.text = "";
        quesionData.type = "text";
        quesionData.options = [];
        quesionData.correctOption = "";
        setNoOfInputs(0);
        setCloseAddQuestion(false);

        fetchQuiz(quizId);
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const handleInputChange2 = (name, value) => {
    setQuestionData((prevData) => {
      if (name.startsWith("options")) {
        const optionIndex = Number(name.replace("options", ""));
        const updatedOptions = [...prevData.options];
        updatedOptions[optionIndex] = { text: value }; // Ensure value is a string

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
  const handleInputChange3 = (name, value) => {
    setUpdatedQuestion((prevData) => {
      if (name.startsWith("options")) {
        const optionIndex = Number(name.replace("options", ""));
        const updatedOptions = [...prevData.options];
        updatedOptions[optionIndex] = { text: value }; // Ensure value is a string
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

  // const calculateResult = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/admin/compileResults/${quizId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       console.log("Result calculated successfully");
  //     }
  //   } catch (error) {
  //     console.error("Failed to calculate result:", error);
  //   }
  // };
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the confirmation popup

  const calculateResult = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true); // Show confirmation popup
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/admin/compileResults/${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Result calculated successfully");
        alert("Result calculated successfully"); // Show success alert
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to calculate result:", error);
      alert("Failed to calculate result. Please try again."); // Show error alert
    } finally {
      setShowConfirmation(false); // Reset confirmation state
    }
  };
  return (
    <div className="h-[100%] w-[100%] ">
      {quizId ? (
        <>
          <div className=" flex flex-col items-left justify-center bg-white text-black p-4 rounded-lg max-h-[100%] w-[100%]">
            <p className="text-3xl font-bold text-black text-center">
              {selectedQuiz ? selectedQuiz.title : "N/A"}
            </p>

            <div>
              <p className="text-xl mb-3">
                <span className="font-bold">Discription: </span>{" "}
                {selectedQuiz ? selectedQuiz.description : "N/A"}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-l font-bold mt-2">
                    {selectedQuiz
                      ? "Total Registered: " + selectedQuiz.totalRegistered
                      : "N/A"}
                  </p>

                  <p className="text-l font-bold mt-2">
                    {selectedQuiz
                      ? "Start Date: " +
                        new Date(selectedQuiz.startTime).toLocaleString()
                      : "N/A"}{" "}
                    <br />
                    {selectedQuiz
                      ? "End Date: " +
                        new Date(selectedQuiz.endTime).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 ">
                  <Dialog
                    isOpen={closeAddQuestion}
                    onDismiss={() => setCloseAddQuestion(false)}
                    className="relative z-10"
                  >
                    <DialogTrigger>
                      <div
                        onClick={() => {
                          setCloseAddQuestion(true);
                        }}
                        className="text-white bg-black p-3 h-fit rounded-xl hover:bg-slate-500 cursor-pointer"
                      >
                        Add Question
                      </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[70%] h-[90%] mx-auto overflow-auto bg-white p-8 rounded-xl shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold mb-4">
                          Add Question
                        </DialogTitle>
                        <DialogDescription>
                          <div className="flex flex-col justify-center">
                            <label className="font-bold mb-2">
                              Enter the Question
                            </label>
                            <textarea
                              onChange={(e) => {
                                handleInputChange2("text", e.target.value);
                              }}
                              name="text"
                              className="border border-gray-300 rounded-md p-2 mb-4 w-full h-24"
                            />
                            <div>
                              <label className="font-bold mb-2">
                                Enter the type of response you want
                              </label>
                              <select
                                onChange={(e) => {
                                  handleInputChange2("type", e.target.value);
                                }}
                                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                defaultValue={"radio"}
                              >
                                <option value="text">Text</option>
                                <option value="radio">Single Correct</option>
                              </select>
                            </div>
                            {quesionData.type === "radio" && (
                              <>
                                <label className="font-bold mb-2">
                                  Enter the number of options you want
                                </label>
                                <input
                                  onChange={(e) => {
                                    setNoOfInputs(e.target.value);
                                  }}
                                  value={noOfInputs}
                                  name="options"
                                  className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                  type="number"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  {Array.from({
                                    length: Number(noOfInputs),
                                  }).map((_, index) => (
                                    <div
                                      className="flex flex-col items-start mb-4 w-full"
                                      key={index}
                                    >
                                      <label className="font-bold mb-1">
                                        Enter the Option {index + 1}
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          handleInputChange2(
                                            `options${index}`,
                                            e.target.value
                                          );
                                        }}
                                        name={`options${index}`}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                        type="text"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                            <label className="font-bold mb-2">
                              Enter the correct Answer
                            </label>
                            <input
                              onChange={(e) => {
                                handleInputChange2(
                                  "correctOption",
                                  e.target.value
                                );
                              }}
                              name="correctOption"
                              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                              type="text"
                            />
                            <div className="flex gap-4 mt-4">
                              <DialogClose
                                className="bg-black text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                  handleSubmit3(selectedQuiz._id);
                                }}
                              >
                                Add Question
                              </DialogClose>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <div
                    className=" text-black w-fit h-fit flex bg-yellow-300 p-3 rounded-xl cursor-pointer hover:bg-yellow-400 font-bold"
                    onClick={() => {
                      setEditQuiz(true);
                    }}
                  >
                    Edit Quiz Details
                  </div>
                  {showConfirmation && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-lg shadow-lg w-[50vw] h-[50vh] flex justify-center flex-col items-center">
                        <p className="text-lg font-bold mb-4">Are you sure you want to calculate results?</p>
                        <p className="text-lg mb-4">This action will calculate all the score and the leaderboard will be displayed.</p>
                        <div className="flex">
                          <button
                            className="text-white bg-red-500 px-4 py-2 rounded mr-2 hover:bg-red-600"
                            onClick={() => setShowConfirmation(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                            onClick={calculateResult}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}



                  <button
                    className="text-white bg-black p-3 h-fit rounded-xl hover:bg-slate-500"
                    onClick={calculateResult}
                  >
                    Calculate Result
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border-2  mt-[2rem] min-w-[100%] flex flex-col overflow-y-auto max-h-[60%] text-black text-xl p-4">
              {questions.length ? (
                <>
                  {questions.map((question, formIndex) => (
                    <div
                      className="flex flex-row items-center  justify-between p-4 gap-4"
                      key={formIndex}
                    >
                      <form className="flex flex-col w-[80%]  gap-4 items-start justify-center mt-3">
                        <label className="" style={{ fontWeight: "bold" }}>
                          {" "}
                          {formIndex + 1}. {question.text}
                        </label>
                        {question.type === "text" && (
                          <input
                            className="text-black border border-gray-300 rounded-md px-2 py-1 w-[80%]"
                            type="text"
                            placeholder="Enter your answer"
                          />
                        )}
                        {question.type === "radio" && (
                          <>
                            {question.options &&
                              question.options.length > 0 && (
                                <div className=" flex-col flex items-start justify-center">
                                  {question.options.map((option) => (
                                    <label key={option._id}>
                                      <input
                                        className="text-black mr-2"
                                        type="radio"
                                        name={question.text}
                                        value={option.text}
                                      />
                                      {option.text}
                                    </label>
                                  ))}
                                </div>
                              )}
                          </>
                        )}
                      </form>
                      <div className=" flex items-center justify-center gap-4 w-[20%] ">
                        <Dialog>
                          <DialogTrigger>
                            <div
                              onClick={() => {
                                setUpdatedQuestion(question);
                                setNoOfInputs(question.options.length);
                              }}
                              className="bg-black text-white p-2 rounded-md cursor-pointer"
                            >
                              Edit
                            </div>
                          </DialogTrigger>
                          <DialogContent className="min-w-[70%] h-[90%] mx-auto overflow-auto bg-white p-8 rounded-xl shadow-lg">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold mb-4">
                                Update Your Question
                              </DialogTitle>
                              <DialogDescription>
                                <div className="flex flex-col justify-center">
                                  <label className="font-bold mb-2">
                                    Enter the Question
                                  </label>
                                  <textarea
                                    onChange={(e) =>
                                      handleInputChange3("text", e.target.value)
                                    }
                                    name="text"
                                    className="border border-gray-300 rounded-md p-2 mb-4 w-full h-24"
                                    value={updatedQuestion.text}
                                  />
                                  <div>
                                    <label className="font-bold mb-2">
                                      Enter the type of response you want
                                    </label>
                                    <select
                                      onChange={(e) =>
                                        handleInputChange3(
                                          "type",
                                          e.target.value
                                        )
                                      }
                                      className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                      value={updatedQuestion.type}
                                    >
                                      <option value="text">Text</option>
                                      <option value="radio">
                                        Single Correct
                                      </option>
                                    </select>
                                  </div>
                                  {updatedQuestion.type === "radio" && (
                                    <>
                                      <label className="font-bold mb-2">
                                        Enter the number of options you want
                                      </label>
                                      <input
                                        onChange={(e) =>
                                          setNoOfInputs(e.target.value)
                                        }
                                        name="options"
                                        value={noOfInputs}
                                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                        type="number"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                        {Array.from({
                                          length: Number(noOfInputs),
                                        }).map((_, index) => (
                                          <div
                                            className="flex flex-col items-start mb-4 w-full"
                                            key={index}
                                          >
                                            <label className="font-bold mb-1">
                                              Enter the Option {index + 1}
                                            </label>
                                            <input
                                              onChange={(e) =>
                                                handleInputChange3(
                                                  `options${index}`,
                                                  e.target.value
                                                )
                                              }
                                              name={`options${index}`}
                                              className="border border-gray-300 rounded-md p-2 w-full"
                                              type="text"
                                              value={
                                                updatedQuestion.options[
                                                  index
                                                ] &&
                                                updatedQuestion.options[index]
                                                  .text
                                              }
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <label className="font-bold mb-2">
                                    Enter the correct Answer
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleInputChange3(
                                        "correctOption",
                                        e.target.value
                                      )
                                    }
                                    value={updatedQuestion.correctOption}
                                    name="correctOption"
                                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                    type="text"
                                  />
                                  <div className="flex gap-4 mt-4">
                                    <button
                                      className="bg-black text-white px-4 py-2 rounded-md"
                                      onClick={() => handleSubmit(question._id)}
                                    >
                                      Update Question
                                    </button>
                                    <DialogClose className="bg-red-500 text-white px-4 py-2 rounded-md">
                                      Close
                                    </DialogClose>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        {/* <button
                          onClick={() => {
                            handleDeleteQuestion(question._id);                            
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button> */}


                     
                        <Dialog>
                          <DialogTrigger>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                              Delete
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-white p-8 rounded-xl shadow-lg">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold mb-4">Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                <p>Are you sure you want to delete this question?</p>
                                <div className="flex gap-4 mt-4">
                                  <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => {
                                      handleDeleteQuestion(question._id);
                         
                                    }}
                                  >
                                    Yes, Delete
                                  </button>
                                  <DialogClose className="bg-black text-white px-4 py-2 rounded-md">
                                      Close
                                  </DialogClose>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                     
                      </div>

                      <div></div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-black">
                    No questions available for this quiz
                  </div>
                </>
              )}
            </div>

            {/* Add more quiz details as needed */}
          </div>
        </>
      ) : (
        <>
          <div className=" text-black flex items-center justify-center mt-[3rem]">
            <h1 className="text-3xl">Quiz not selected</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizSlected;
