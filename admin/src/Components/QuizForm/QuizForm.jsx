import React from "react";
import styles from "./QuizForm.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//react quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuizForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    duration: "",
    adminId: user ? user : null,
    rules: [],
    category: "Coding",
  });

  const [newRule, setNewRule] = useState("");

  const handleInputChange = (name, value) => {
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim() !== "") {
      setQuizData((prevData) => ({
        ...prevData,
        rules: [...prevData.rules, newRule],
      }));
      setNewRule(""); // clear input field
    }
  };

  const handleDeleteRule = (index) => {
    setQuizData((prevData) => ({
      ...prevData,
      rules: prevData.rules.filter((rule, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    console.log(quizData);
    try {
      const response = await fetch(`${apiUrl}/admin/createquiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Quiz Created Successfully", data);
        alert("Quiz Created Successfully");
        navigate("/");
        window.location.reload();
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizForm}>
        <div className={styles.quizHeader}>
          <h1>Create Contest</h1>
        </div>
        <div className={styles.quizContent}>
          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <label>Title</label>
              <Input
                id="title"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="Category">Category</label>
              <select id="category"
              onChange={(e) => handleInputChange("category", e.target.value)}
              >
                <option value="Coding" default>Coding</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Aptitude">Aptitude</option>
                <option value="DSA">DSA</option>
                <option value="Web Dev">Web Dev</option>
                <option value="science">Science</option>
              </select>
              {/* <Input
                id="category"
                onChange={(e) => handleInputChange("category", e.target.value)}
                
              /> */}
            </div>
          </div>

          <div className={styles.formField}>
            <label>Description</label>
            <textarea
              id="description"
              rows={8}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={styles.descriptionTextarea}
              value={quizData.description}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <label>Start Time</label>
              <Input
                className="w-[100%]"
                type="datetime-local"
                value={quizData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label>End Time</label>
              <Input
                className="w-[100%]"
                type="datetime-local"
                value={quizData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label>Duration</label>
              <Input
                type="number"
                className="w-[100%]"
                value={quizData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>
          </div>
          {/* rule and regulation */}
          <div className={styles.formField}>
            <label>Rules and Regulations</label>
            <div className={styles.formInline}>
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Enter a new rule"
              />
              <Button onClick={handleAddRule} className={styles.ml2}>
                Add Rule
              </Button>
            </div>
            <ul className={styles.rulesList}>
              {quizData.rules.map((rule, index) => (
                <li key={index} className={styles.formInline}>
                  <span className={styles.ruleText}>{rule}</span>
                  <Button
                    onClick={() => handleDeleteRule(index)}
                    className={styles.ml2}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleSubmit} className={styles.fullWidthBtn}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
