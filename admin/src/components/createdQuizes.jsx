import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import QuizSlected from './selectedQuiz';

import { MdDelete } from "react-icons/md";
const CreatedQuizes=()=> {  
  const [quesionData, setQuestionData] = useState({
    quizId: "",
    text: "",
    type: "text",
    options: [] ,
    correctOption:""
   
  });
  const apiUrl = "http://localhost:4000";
    const { user } = useSelector((state) => state.profile)
    const [userQuizes, setUserQuizes] = useState([]);
    const [selectedQuiz, setSelectedQuizes] = useState();
    const     [quizId, setquizId] = useState("");
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
    useEffect(() => {
        if (user) {
          console.log(user);
          fetchUserQuizes();
        }
      }, []);
      const handleDelete = async (quizId) => {
        try {
          const response = await fetch(`${apiUrl}/admin/deletequiz/${quizId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },  
            credentials: "include",
          });
          if(response.ok){
            console.log("Quiz deleted");
            fetchUserQuizes();
            alert("Quiz deleted successfully");
          }
          else{
            console.error("Failed to delete quiz. Status:", response.status);
          }
        } catch (error) {
          console.error("Failed to delete quiz:", error);
        }
      };
      const [noOfInputs,setNoOfInputs]=useState("0");
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
    
      const handleQuizClick = (quizId) => {
        // Fetch and display quiz details when a quiz is clicked
        console.log("id of the quiz is", quizId);
        fetchQuizDetails (quizId);
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
          const response = await fetch(`${apiUrl}/admin/deletequestion/${questionid}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if(response.ok){
            console.log("Question deleted");
           
          }
          else{
            console.error("Failed to delete question. Status:", response.status);
          }
        } catch (error) {
          console.error("Failed to delete question:", error);
        }
      };

    const fetchQuizDetails = async (quizId) => {

        const fetchQuestionDetails = async (questionId) => {
            try {
              
              const response = await fetch(`${apiUrl}/admin/getquestion/${questionId}`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
          
              if (response.ok) {
                const data = await response.json();
               console.log(data);
               setQuestionDatas((prevData) => [...prevData, data]);
              console.log("Question details -:"+questions);
              } else {
                console.error("Failed to fetch question. Status:", response.status);
              }
            } catch (error) {
              console.error("Failed to fetch question:", error);
            }
          };
      
        
        try {
          console.log(quizId);
          const response = await fetch(`${apiUrl}/admin/getquiz/${quizId}`,{
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
            console.log("id of the quiz is",quizId);
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
          } 
         catch (error) {
          console.error("Failed to fetch responses:", error);
        }
      };
      

   
          
    return (
        <div className=' flex items-center justify-between w-[100%] h-[100%]'>
          
<div className="flex bg-white mt-9 h-[91%] p-4 flex-col w-[30%]  gap-4 overflow-scroll text-white">

          {userQuizes.map((quiz) => (
            <div  key={quiz._id} className=" border-2 border-black  hover:border-yellow-400 rounded-xl p-4 flex gap-4 flex-row items-center justify-center">
              <div
             onClick={() => handleQuizClick(quiz._id)}
              className=" p-4  cursor-pointer  flex-row rounded-lg   bg-white text-black w-[300px] h-[100px] flex items-center justify-between "
            
              
            > 
              <p className='text-xl font-extrabold' >{quiz.title}</p>
             <div>
             {quiz.startTime.substring(5,10)} - {quiz.endTime.substring(5,10)}
              </div>
             
      
            </div>
            <div className='text-black' onClick={ ()=>{
                handleDelete(quiz._id);
                
              }}> <MdDelete style={{fontSize:"2rem", color:"orange" }} /> </div>
          

            </div>
            
            
          ))}
        </div>
        <div className= " w-[70%] h-[91%] border-l-2 border-l-yellow-300 bg-white text-black "> 
        {
          console.log("quiz id is -",quizId)
        } 
        <QuizSlected fetchQuizDetails={fetchQuizDetails} fetchQuiz={fetchUserQuizes} selectedQuiz={selectedQuiz} questions={questions} quizId={quizId}/>
        </div>
        </div>
    )
}

export default CreatedQuizes