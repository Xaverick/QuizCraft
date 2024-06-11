import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const EditQuiz = ({ selectedQuiz, setEditQuiz }) => {
  const { toast } = useToast();
  const apiUrl = "http://localhost:4000";

  // Convert UTC time to local time string in the format required by datetime-local input
  const convertUTCToLocal = (utcTime) => {
    const localTime = new Date(utcTime);
    const offset = localTime.getTimezoneOffset();
    const adjustedTime = new Date(localTime.getTime() - offset * 60000);
    return adjustedTime.toISOString().slice(0, 16);
  };

  // Convert local time string back to UTC time
  const convertLocalToUTC = (localTime) => {
    const date = new Date(localTime);
    return date.toISOString();
  };

  const [quizData, setQuizData] = useState({
    title: selectedQuiz.title || "",
    description: selectedQuiz.description || "",
    startTime: convertUTCToLocal(selectedQuiz.startTime) || "",
    endTime: convertUTCToLocal(selectedQuiz.endTime) || "",
    duration: selectedQuiz.duration || "",
    adminId: selectedQuiz.adminId || "",
    rules: selectedQuiz.rules || [],
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
      setNewRule("");
    }
  };

  const handleDeleteRule = (index) => {
    setQuizData((prevData) => ({
      ...prevData,
      rules: prevData.rules.filter((rule, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const utcStartTime = convertLocalToUTC(quizData.startTime);
    const utcEndTime = convertLocalToUTC(quizData.endTime);

    const updatedQuizData = {
      ...quizData,
      startTime: utcStartTime,
      endTime: utcEndTime,
    };

    try {
      const response = await fetch(`${apiUrl}/admin/updatequiz/${selectedQuiz._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuizData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Quiz Updated Successfully", data);
        alert("Quiz Updated Successfully");
        window.location.reload();
      } else {
        console.error("Failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center  w-[100%] bg-gray-200 bg-opacity-80 backdrop-blur-lg">
      <div className="bg-white p-8 rounded-lg shadow-md w-[100%] ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold">Title</label>
          <Input id="title" value={quizData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
          <label className="text-sm font-semibold">Description</label>
          <textarea
            id="description"
            value={quizData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="resize-none h-32 border border-gray-300 rounded-md p-2"
          />
          <div className="flex flex-row gap-5">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold">Start Time</label>
              <Input className="w-[100%]" type="datetime-local" value={quizData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold">End Time</label>
              <Input className="w-[100%]" type="datetime-local" value={quizData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold">Duration</label>
              <Input type="number" className="w-[100%]" value={quizData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} />
            </div>
          </div>
          <label className="text-sm font-semibold">Rules and Regulations</label>
          <div className="flex flex-row">
            <Input
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="Enter a new rule"
              className="w-[100%]"
            />
            <Button onClick={handleAddRule} className="ml-2">Add Rule</Button>
          </div>
          <div className="flex flex-col gap-2">
            {quizData.rules.map((rule, index) => (
              <div key={index} className="flex flex-row">
                <li key={index} className="w-[100%] ">
                  {rule}
                </li>
                <Button onClick={() => handleDeleteRule(index)} className="ml-2">Delete</Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className=" w-[50%] mx-auto">Update And Save</Button>
            <Button className=" w-[50%] mx-auto" onClick={() => setEditQuiz(false)}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
