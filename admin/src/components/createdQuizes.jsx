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
const CreatedQuizes=()=> {  

  const apiUrl = "http://localhost:4000";
    const { user } = useSelector((state) => state.profile)
    const [userQuizes, setUserQuizes] = useState([]);
    const [selectedQuiz, setSelectedQuizes] = useState();
    const     [quizId, setquizId] = useState("");
    const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
    const [response2, setResponse] = useState([]);
    const [questions, setQuestionDatas] = useState([]);
    useEffect(() => {
        if (user) {
          console.log(user);
          fetchUserQuizes();
        }
      }, [user]);
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
          }
          else{
            console.error("Failed to delete quiz. Status:", response.status);
          }
        } catch (error) {
          console.error("Failed to delete quiz:", error);
        }
      };

      const handleQuizClick = (quizId) => {
        // Fetch and display quiz details when a quiz is clicked
        console.log("id of the quiz is", quizId);
        fetchQuizDetails (quizId);
          
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
      
          const fetchResponseDetails = async () => {
            try {
              const response = await fetch(`${apiUrl}/admin/getResponse/${quizId}`);
          
              if (response.ok) {
                const data = await response.json();
               console.log(data);
               setResponse((prevData) => [...prevData, data]);
              console.log(response2);
              
              } else {
                console.error("Failed to fetch input. Status:", response.status);
              }
            } catch (error) {
              console.error("Failed to fetch input:", error);
            }
          }
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
            setquizId(data._id); 
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
        <div>
           <h2 className="text-xl ">Your Quizes:</h2>
<div className="flex flex-row w-[70%] flex-wrap justify-center gap-4 items-center text-white">
        
          {userQuizes.map((quiz) => (
            <div  key={quiz._id} className=" flex gap-4 flex-col items-center justify-center">
              <div
             
              className="cursor-pointer hover:bg-black flex-col hover:text-white transition-all duration-200 bg-white text-black w-[100px] h-[100px] flex items-center justify-center hover:underline"
            
              
            >
              <p   onClick={() => handleQuizClick(quiz._id)}>{quiz.title}</p>
             
      
            </div>
            <div onClick={ ()=>{
                handleDelete(quiz._id);
                
              }}> Delete </div>
            </div>
            
          ))}
        </div>
        <div className="bg-white text-black ">     {selectedQuiz ?(
        <div className=" overflow-scroll" onDoubleClick={()=>{
          setFormDetailsDialogOpen(false);
        }}>
           <Dialog  open={isFormDetailsDialogOpen} >
  <DialogContent className=" overflow-scroll h-[100%]">
    <DialogHeader>
     
    </DialogHeader>
    {/* Display all details of the quiz here */}
    <div className=" flex flex-col items-center justify-center bg-white text-black p-4 rounded-lg">
  <h2 className="text-xl text-black">Form Details:</h2>
  <p>Title: {selectedQuiz ? selectedQuiz.title : "N/A"}</p>
  <h3>Form:</h3>
  <div className="bg-black flex flex-col flex-wrap overflow-scroll justify-center items-center text-white p-4">
  {questions.length>0&&questions.map((question, formIndex) => (
  <div key={formIndex}>
  
    <form>
    <div className=" flex gap-4 items-center justify-center  mt-3" >
          <label>{question.text}</label>
          {question.type === 'text' && (
            <input className="text-black" type="text" />
          )}
          {question.type === 'radio' && (
        <>
        {
          question.options && question.options.length > 0 && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <input className="text-black" type="radio" />
                  {option}
                </label>
              ))}
            </div>
          )
        }
        </>
            
          )}
          {question.type === 'checkbox' && (
            <input className="text-black" type="checkbox" />
          )}
          {/* Add more input types as needed */}
        </div>
    </form>
  </div>
))}
  </div>



<div className=" flex flex-col items-center justify-center">
<h3 className=" text-black text-xl">Responses:</h3>
<div>
{response2.map((responseData, index) => (
  <div className="flex flex-col    items-center justify-center" key={index}>
   <div className="">
   <p className=" bg-black  text-white p-4">User: {responseData.response.Usera};</p>
    {responseData.response.answer && (
      <div>
        <h3>Answer:</h3>
        {Object.entries(responseData.response.answer).map(([key, value]) => (
          <div key={key}>
            <p>{key}: {value}</p>
          </div>
        ))}
      </div>
    )}
   </div>
  </div>
))}
</div>
</div>



  {/* Add more quiz details as needed */}
</div>
<Dialog> 
  <DialogTrigger>
    <div className="bg-black text-white p-4 rounded-lg">Share</div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Share</DialogTitle>
    </DialogHeader>
    <DialogDescription className=" flex flex-col items-center justify-center gap-4">
      
    </DialogDescription>
  </DialogContent>
</Dialog>

<h1 className=" text-black text-lg">Double click to close</h1>
  </DialogContent></Dialog>
          </div>
        ):(<></>)}</div>
        </div>
    )
}

export default CreatedQuizes