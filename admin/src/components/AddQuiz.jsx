import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const AddQuiz = () => {
  const [startdate, setStartDate] = useState(Date.now());
  const [enddate, setEndDate] = useState(Date.now());
  const { toast } = useToast();
  const apiUrl = "http://localhost:4000";
  const [drawerClose, setDrawerClose] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [noOfInputs, setNoOfInputs] = useState("0");
  const [addInput, setAdd] = useState(false);
  const [addedQuestions, setaddedQuestions] = useState([]);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    duration: "",
    adminId: user ? user._id : null,
  });

  const [quesionData, setQuestionData] = useState({
    quizId: "",
    text: "",
    type: "text",
    options: [],
    correctOption: "",
  });

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

  const handleSubmit2 = async () => {
    console.log(quesionData);
    try {
      const response = await fetch(`${apiUrl}/admin/createquestion/${quesionData.quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quesionData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Input added Successfully", data);
        setaddedQuestions((prevInputs) => [...prevInputs, { text: quesionData.text, type: quesionData.type }]);
        quesionData.text = "";
        quesionData.type = "text";
        quesionData.options = [];
        quesionData.correctOption = "";
        setNoOfInputs(0);
        alert("Question added Successfully");
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const handleInputChange = (name, value) => {
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
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
        setQuestionData((prevquesionData) => {
          const updatedquesionData = { ...prevquesionData, quizId: data.quizId };
          setAdd(true);
          setDrawerClose(true);
          alert("Quiz Created Successfully");
          window.location.reload();
          return updatedquesionData;
        });
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100%] w-[100%] bg-gray-200 bg-opacity-80 backdrop-blur-lg">
      <div className="bg-white p-8 rounded-lg shadow-md w-[100%] ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Create  Quiz</h1>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold">Title</label>
          <Input id="title" onChange={(e) => handleInputChange("title", e.target.value)} />
          <label className="text-sm font-semibold">Description</label>
          <textarea
            id="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="resize-none h-32 border border-gray-300 rounded-md p-2"
          />
          <label className="text-sm font-semibold">Start Time</label>
          <Input className=" w-[400px]" type="date" onChange={(e) => handleInputChange("startTime", e.target.value)} />
          <label className="text-sm font-semibold">End Time</label>
          <Input className=" w-[400px]"  type="date" onChange={(e) => handleInputChange("endTime", e.target.value)} />
          <label className="text-sm font-semibold">Duration</label>
          <Input type="number" onChange={(e) => handleInputChange("duration", e.target.value)} />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
