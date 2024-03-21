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
           <h2 className="text-xl text-center mb-4 ">Your Quizes:</h2>
<div className="flex flex-col w-[screen] flex-wrap justify-center gap-4 items-center text-white">
        
          {userQuizes.map((quiz) => (
            <div  key={quiz._id} className=" flex gap-4 flex-row items-center justify-center">
              <div
             onClick={() => handleQuizClick(quiz._id)}
              className=" p-4 cursor-pointer hover:bg-black flex-row rounded-lg  hover:text-white transition-all duration-200 bg-white text-black w-[400px] h-[100px] flex items-center justify-between "
            
              
            >
              <p className='text-xl font-extrabold' >{quiz.title}</p>
             <div>
             {quiz.startTime.substring(5,10)} - {quiz.endTime.substring(5,10)}
              </div>
             
      
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
  <div className='flex flex-row items-center justify-center gap-4' key={formIndex}>
  
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
    <Dialog >
  <DialogTrigger><div
    
   className="bg-black text-white p-4 rounded-lg" >Edit</div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Your Question</DialogTitle>
      <DialogDescription>
     <div className=" flex flex-col items-center justify-center">
      <label>Enter the Question</label>
      <input onChange={(e)=>{
        handleInputChange2("text",e.target.value);
      }}  name="text" className=" border-2" type="text"></input>
      <label>Enter the type of response you want</label>
      <select  onChange={(e) => {
  handleInputChange2("type", e.target.value);
}}>
  
  <option value="text">Text</option>
  <option value="radio">radio</option> 
   <option value="checkbox">checkbox</option>

  
</select>

{
  quesionData.type=="radio"?(<>
  <label>Enter the no of radio buttons you want</label>
  <input onChange={(e)=>{
setNoOfInputs(e.target.value);
  }} name="options" className=" border-2" type="number"></input>
  {Array.from({ length: Number(noOfInputs) }).map((_, index) => (
    <div key={index}>
      <label>Enter the label</label>
      <input
        onChange={(e) => {
          handleInputChange2(`options${index}`, e.target.value);
        }}
        name={`options${index}`}
        className="border-2"
        type="text"
      ></input>
     
    </div>
  ))}

  
  </>):(<></>)

}
<label>Enter the correct Option</label>
      <input onChange={(e)=>{
        handleInputChange2("correctOption",e.target.value);
      }}  name="correctOption" className=" border-2" type="text"></input>

<button className="bg-black text-white p-4 rounded-lg"  onClick={()=>{
  handleSubmit2(question._id);
}}>
  
  Update Question
</button>

     
     </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
<button onClick={()=>{
  handleDeleteQuestion(question._id);
}}>
  Delete
</button>
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