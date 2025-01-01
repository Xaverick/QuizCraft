import React, { useState } from "react";
import styles from "./AddQuestion.module.css";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";

const AddQuestion = ({ fetchAllQuestions, setAddQuestion }) => {
  const { id: quizId } = useParams(); // Destructure the id from useParams
  const apiUrl = import.meta.env.VITE_API_URL;

  const [questionData, setQuestionData] = useState({
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

  const [noOfInputs, setNoOfInputs] = useState(4);

  const handleInputChange = (name, value) => {
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

  const handleCreateQuestion = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/createquestion/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Question added successfully", data);

        // Reset the form
        setQuestionData({
          quizId: quizId,
          text: "",
          type: "radio",
          options: [{ text: "" }],
          correctOption: "",
        });
        setNoOfInputs(4);

        fetchAllQuestions();
      } else {
        console.error("Failed to create question. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to create question", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.close} onClick={() => setAddQuestion(false)}>
          <IoMdClose />
        </div>

        <h2 className={styles.heading}>Add Question</h2>
        <label>Enter the Question</label>
        <textarea
          className={styles.textarea}
          onChange={(e) => {
            handleInputChange("text", e.target.value);
          }}
          name="text"
          value={questionData.text}
        />
        {/*  */}
        <label>Enter the type of response you want</label>
        <select
          className={styles.select}
          defaultValue={"radio"}
          onChange={(e) => {
            handleInputChange("type", e.target.value);
          }}
        >
          <option value="radio">Single Correct</option>
          <option value="text">Text</option>
        </select>
        {questionData?.type === "radio" && (
          <>
            <label>Enter the number of options you want</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Enter the number of options you want"
              onChange={(e) => {
                setNoOfInputs(e.target.value);
              }}
              value={noOfInputs}
              name="options"
            />

            <div className={styles.optionField}>
              {Array.from({ length: noOfInputs }).map((_, index) => (
                <input
                  className={styles.outputinput}
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => {
                    handleInputChange(`options${index}`, e.target.value);
                  }}
                  name={`options${index}`}
                />
              ))}
            </div>
          </>
        )}

        {/*  */}
        <label>Enter the correct Answer</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            handleInputChange("correctOption", e.target.value);
          }}
          value={questionData.correctOption}
          name="correctOption"
        />
        <button
          className={styles.button}
          onClick={() => {
            handleCreateQuestion();
            setAddQuestion(false);
          }}
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
