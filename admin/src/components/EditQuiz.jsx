// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { useSelector } from "react-redux";

// const EditQuiz = ({ selectedQuiz,setEditQuiz }) => {
//   const [quizData, setQuizData] = useState({
//     title: selectedQuiz.title || "",
//     description: selectedQuiz.description || "",
//     startTime: new Date(selectedQuiz.startTime).toISOString().slice(0, 16) || "",
//     endTime: new Date(selectedQuiz.endTime).toISOString().slice(0, 16) || "",
//     duration: selectedQuiz.duration || "",
//     adminId: selectedQuiz.adminId || "",
//   });

//   const [drawerClose, setDrawerClose] = useState(false);
//   const { toast } = useToast();
//   const apiUrl = "http://localhost:4000";
//   const { user } = useSelector((state) => state.profile);

//   const handleInputChange = (name, value) => {
//     setQuizData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     console.log(quizData);
//     try {
//       const response = await fetch(`${apiUrl}/admin/updatequiz/${selectedQuiz._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(quizData),
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Quiz Updated Successfully", data);
//         alert("Quiz Updated Successfully");
//         window.location.reload();
//       } else {
//         console.error("Failed. Status:", response.status);
//       }
//     } catch (error) {
//       console.error("Failed", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-[100%] w-[100%] bg-gray-200 bg-opacity-80 backdrop-blur-lg">
//       <div className="bg-white p-8 rounded-lg shadow-md w-[100%] ">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
//         </div>
//         <div className="flex flex-col gap-4">
//           <label className="text-sm font-semibold">Title</label>
//           <Input id="title" value={quizData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
//           <label className="text-sm font-semibold">Description</label>
//           <textarea
//             id="description"
//             value={quizData.description}
//             onChange={(e) => handleInputChange("description", e.target.value)}
//             className="resize-none h-32 border border-gray-300 rounded-md p-2"
//           />
//           <label className="text-sm font-semibold">Start Time</label>
//           <Input className="w-[400px]" type="datetime-local" value={quizData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
//           <label className="text-sm font-semibold">End Time</label>
//           <Input className="w-[400px]" type="datetime-local" value={quizData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
//           <label className="text-sm font-semibold">Duration</label>
//           <Input type="number" value={quizData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} />
//           <Button onClick={handleSubmit}>Update</Button>
//           <Button className=" w-[100px] mx-auto" onClick={() => setEditQuiz(false) }>Close</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditQuiz;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const EditQuiz = ({ selectedQuiz, setEditQuiz }) => {
  const { toast } = useToast();
  const apiUrl = "http://localhost:4000";
  const [quizData, setQuizData] = useState({
    title: selectedQuiz.title || "",
    description: selectedQuiz.description || "",
    startTime: new Date(selectedQuiz.startTime).toISOString().slice(0, 16) || "",
    endTime: new Date(selectedQuiz.endTime).toISOString().slice(0, 16) || "",
    duration: selectedQuiz.duration || "",
    adminId: selectedQuiz.adminId || "",
    rules: selectedQuiz.rules || [], // added rules array
  });

  const [newRule, setNewRule] = useState(""); // input for new rule

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
      const response = await fetch(`${apiUrl}/admin/updatequiz/${selectedQuiz._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
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
    <div className="flex items-center justify-center h-[100%] w-[100%] bg-gray-200 bg-opacity-80 backdrop-blur-lg">
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
          <label className="text-sm font-semibold">Start Time</label>
          <Input className="w-[400px]" type="datetime-local" value={quizData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
          <label className="text-sm font-semibold">End Time</label>
          <Input className="w-[400px]" type="datetime-local" value={quizData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
          <label className="text-sm font-semibold">Duration</label>
          <Input type="number" value={quizData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} />
          <label className="text-sm font-semibold">Rules and Regulations</label>
          <Input
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Enter a new rule"
          />
          <Button onClick={handleAddRule}>Add Rule</Button>
          <ul>
            {quizData.rules.map((rule, index) => (
              <li key={index}>
                {rule}
                <Button onClick={() => handleDeleteRule(index)}>Delete</Button>
              </li>
            ))}
          </ul>
          <Button onClick={handleSubmit}>Update</Button>
          <Button className=" w-[100px] mx-auto" onClick={() => setEditQuiz(false) }>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;