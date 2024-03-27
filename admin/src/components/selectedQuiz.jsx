import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
  import { useToast } from "@/components/ui/use-toast"
  import { useState } from "react"; 
const apiUrl = "http://localhost:4000";
const QuizSlected = ({selectedQuiz,questions,quizId,fetchQuiz,fetchQuizDetails}) => {
  const toast = useToast();  
    const [quesionData, setQuestionData] = useState({
        quizId: quizId,
        text: "",
        type: "text",
        options: [] ,
        correctOption:""
       
      });
      useEffect(() => {
        fetchQuiz();
        fetchQuizDetails(quizId);
      }, []);
      const [noOfInputs, setNoOfInputs] = useState(0);
      const handleDeleteQuestion = async (questionid) => {
        try {
          const response = await fetch(`${apiUrl}/admin/deletequestion/${questionid}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if(response.ok){
            console.log("Question deleted");
           alert("Question Deleted")
           
          }
          else{
            console.error("Failed to delete question. Status:", response.status);
          }
        } catch (error) {
          console.error("Failed to delete question:", error);
        }
      };
      const handleSubmit2 = async (questionId) => {
   
        console.log(quesionData);
        try {
    
          const response = await fetch(`${apiUrl}/admin/updatequestion/${questionId}`, {
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
           
          } else {
            console.error("failed. Status:", response.status);
          }
         
    
        } catch (error) {
          console.error("Failed", error);
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
            console.log("Input added Successfully", data);
            setaddedQuestions((prevInputs) => [...prevInputs, { text: quesionData.text, type: quesionData.type }]);
    
          } else {
            console.error("failed. Status:", response.status);
          }
         
    
        } catch (error) {
          console.error("Failed", error);
        }
      };
      
      const handleInputChange2 = (name,value) => {
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
    return (
        <div className="h-[100%] w-[100%]">
            <div className=" flex flex-col items-center justify-center bg-white text-black p-4 rounded-lg">
<h2 className="text-5xl font-bold text-black">Quiz Details:</h2>
<p className="text-3xl font-medium">Title: {selectedQuiz ? selectedQuiz.title : "N/A"}</p>

<div className="bg-white border-2  min-h-[500px] mt-[50px] min-w-[100%] flex flex-col flex-wrap overflow-scroll  text-black text-xl p-4">
  {questions.length ? (
    <>
      {questions.map((question, formIndex) => (
        <div className='flex flex-row items-center  justify-between p-4 gap-4' key={formIndex} >
          <form className="flex flex-col w-[50%]  gap-4 items-center justify-center mt-3">
            <label className="" style={{ fontWeight: 'bold' }}>{question.text}</label>
            {question.type === 'text' && (
              <input className="text-black border border-gray-300 rounded-md px-2 py-1" type="text" />
            )}
            {question.type === 'radio' && (
              <>
                {question.options && question.options.length > 0 && (
                  <div className=" flex-col flex items-center justify-center">
                    {question.options.map((option) => (
                      <label key={option}>
                        <input className="text-black mr-2" type="radio" name={question.text} value={option} />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
            {question.type === 'checkbox' && (
              <input className="text-black" type="checkbox" />
            )}
            {/* Add more input types as needed */}
          </form>
          <div className=" flex items-center justify-center gap-4 w-[50%] ">
          <Dialog>
            <DialogTrigger>
              <div className="bg-black text-white p-2 rounded-md cursor-pointer">Edit</div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Your Question</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center justify-center">
                    <label style={{ fontWeight: 'bold' }}>Enter the Question</label>
                    <input
                      onChange={(e) => {
                        handleInputChange2("text", e.target.value);
                      }}
                      name="text"
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                      type="text"
                    />
                    <label style={{ fontWeight: 'bold' }}>Enter the type of response you want</label>
                    <select
                      onChange={(e) => {
                        handleInputChange2("type", e.target.value);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    >
                      <option value="text">Text</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                    {quesionData.type === "radio" && (
                      <>
                        <label style={{ fontWeight: 'bold' }}>Enter the number of radio buttons you want</label>
                        <input
                          onChange={(e) => {
                            setNoOfInputs(e.target.value);
                          }}
                          name="options"
                          className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                          type="number"
                        />
                        {Array.from({ length: Number(noOfInputs) }).map((_, index) => (
                          <div key={index}>
                            <label style={{ fontWeight: 'bold' }}>Enter the label</label>
                            <input
                              onChange={(e) => {
                                handleInputChange2(`options${index}`, e.target.value);
                              }}
                              name={`options${index}`}
                              className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                              type="text"
                            />
                          </div>
                        ))}
                      </>
                    )}
                    <label style={{ fontWeight: 'bold' }}>Enter the correct Option</label>
                    <input
                      onChange={(e) => {
                        handleInputChange2("correctOption", e.target.value);
                      }}
                      name="correctOption"
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                      type="text"
                    />
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        handleSubmit2(question._id);
                      }}
                    >
                      Update Question
                    </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <button
            onClick={() => {
              handleDeleteQuestion(question._id);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
          </div>
       
          <div>
        
          </div>
          
        </div>
        
      ))}
     <div className="mx-auto mt-4">
     <Dialog>
            <DialogTrigger>
              <div className="bg-black text-white p-2  rounded-md cursor-pointer">Add Question</div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Question</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center justify-center">
                    <label style={{ fontWeight: 'bold' }}>Enter the Question</label>
                    <input
                      onChange={(e) => {
                        handleInputChange2("text", e.target.value);
                      }}
                      name="text"
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                      type="text"
                    />
                    <label style={{ fontWeight: 'bold' }}>Enter the type of response you want</label>
                    <select
                      onChange={(e) => {
                        handleInputChange2("type", e.target.value);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                    >
                      <option value="text">Text</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                    {quesionData.type === "radio" && (
                      <>
                        <label style={{ fontWeight: 'bold' }}>Enter the number of radio buttons you want</label>
                        <input
                          onChange={(e) => {
                            setNoOfInputs(e.target.value);
                          }}
                          name="options"
                          className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                          type="number"
                        />
                        {Array.from({ length: Number(noOfInputs) }).map((_, index) => (
                          <div key={index}>
                            <label style={{ fontWeight: 'bold' }}>Enter the label</label>
                            <input
                              onChange={(e) => {
                                handleInputChange2(`options${index}`, e.target.value);
                              }}
                              name={`options${index}`}
                              className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                              type="text"
                            />
                          </div>
                        ))}
                      </>
                    )}
                    <label style={{ fontWeight: 'bold' }}>Enter the correct Option</label>
                    <input
                      onChange={(e) => {
                        handleInputChange2("correctOption", e.target.value);
                      }}
                      name="correctOption"
                      className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                      type="text"
                    />
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        handleSubmit3(selectedQuiz._id);
                      }}
                    >
                      Add Question
                    </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
     </div>
    </>
  ) : (
    <>
      <div className="text-2xl font-bold text-white">No questions available for this quiz</div>
    </>
  )}
</div>





<div className=" flex flex-col items-center justify-center">

<div>

</div>
</div>



{/* Add more quiz details as needed */}
</div>
        </div>
    )
}

export default QuizSlected;