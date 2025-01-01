import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditQuestion.module.css";
import { IoMdClose } from "react-icons/io";

const EditQuestion = ({ isOpen, onClose, question }) => {
  if (!isOpen) return null;

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState({
    quizId: question.quizId,
    text: question.text,
    type: question.type,
    options: question.options,
    correctOption: question.correctOption,
  });

  const [noOfInputs, setNoOfInputs] = useState(question.options.length);

  const handleInputChange = (name, value) => {
    setQuestionData((prevData) => {
      if (name.startsWith("options")) {
        const optionIndex = Number(name.replace("options", ""));
        const updatedOptions = [...prevData.options];
        updatedOptions[optionIndex] = { text: value };

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

  useEffect(() => {
    // Ensure noOfInputs and questionData.options length are synced
    if (noOfInputs > questionData.options.length) {
      const updatedOptions = [...questionData.options];
      while (updatedOptions.length < noOfInputs) {
        updatedOptions.push({ text: "" });
      }
      setQuestionData((prevData) => ({
        ...prevData,
        options: updatedOptions,
      }));
    } else if (noOfInputs < questionData.options.length) {
      const updatedOptions = questionData.options.slice(0, noOfInputs);
      setQuestionData((prevData) => ({
        ...prevData,
        options: updatedOptions,
      }));
    }
  }, [noOfInputs]);

  const handleNoOfInputsChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setNoOfInputs(value === "" ? "" : Number(value));
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/updatequestion/${question._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Question Updated Successfully", data);
        alert("Question Updated Successfully");
        navigate(`/quiz/${question.quizId}`);
        window.location.reload();
      }
    }catch (error) {
      console.error("Failed", error);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.container2}>
            <div className={styles.close} onClick={onClose}>
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
              value={questionData.type}
              onChange={(e) => {
                handleInputChange("type", e.target.value);
              }}
            >
              <option value="radio">Single Correct</option>
              <option value="text">Text</option>
            </select>
            {questionData.type === "radio" && (
              <>
                <label>Enter the number of options you want</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Enter the number of options you want"
                  onChange={handleNoOfInputsChange}
                  value={noOfInputs}
                  name="options"
                />

                <div className={styles.optionField}>
                  {questionData.options.map((option, index) => (
                    <input
                      className={styles.outputinput}
                      key={index}
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
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
                handleUpdateQuestion();
              }}
            >
              Update Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
