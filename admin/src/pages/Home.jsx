

import React, { useEffect, useState } from "react"
import createdQuizes from "../components/createdQuizes";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import { useSelector } from "react-redux";



const Home=()=>{
    // Assuming you are using Node.js


// Your API URL

const [dialogInput, setDialogInput] = useState(false);
const apiUrl = "http://localhost:4000";

const { user } = useSelector((state) => state.profile)
    const [noOfInputs,setNoOfInputs]=useState("0");
    const [addInput,setAdd]=useState(false);
   
    const [addedQuestions, setaddedQuestions] = useState([]);
  const [quizData, setQuizData] = useState({ 
    title: "",
    description: "",
    startTime: "",
    endTime:"",
    duration: "",

  });
  const [quesionData, setQuestionData] = useState({
    quizId: "",
    text: "",
    type: "text",
    options: [] 
   
  });
  
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

  const handleSubmit2 = async () => {
   
    console.log(quesionData);
    try {

      const response = await fetch(`${apiUrl}/admin/createquestion/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quesionData),
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
  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/form/deleteForm    quizId=$    quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form Deleted Successfully", data);
        fetchUserForms();
      } else {
        console.error("failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  }

  const handleInputChange = (name,value) => {
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
          const updatedquesionData = { ...prevquesionData,    quizId: data.quiz._id };
          setAdd(true);
          
          return updatedquesionData;
        });
      } else {
        console.error("failed. Status:", response.status);
     
      }

    } catch (error) {
      console.error("Failed", error);
   
    }
  };


return(
    <div className=" w-[100%] flex flex-col items-center justify-center h-screen ">
      <h1 className=" bg-white text-black p-4 rounded-xl text-3xl">QuizCraft</h1>
      <div className="w-[80%] h-[80%] overflow-scroll  bg-black text-white">
     <nav className="  mx-auto">
 
     </nav>
     <div className="flex flex-col   h-[100%] items-center justify-center  w-[100%] ">
    <div className="z-10 mx-auto flex flex-col   h-[100%] items-center justify-around  w-[100%] gap-2">
     <Dialog >
  <DialogTrigger><div className=" bg-white text-black p-4 rounded-lg">Add Quiz</div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
     <div className=" flex flex-col items-center gap-3 justify-center ">
     <DialogTitle className="text-3xl">Quiz</DialogTitle>
      <DialogDescription>
     
       {
      addInput?(<>
       
      <div className="text-xl flex flex-col gap-4">
        <h1 className=" text-black">{quizData.title}</h1>
        
      <Dialog open={dialogInput}>
  <DialogTrigger><div onClick={()=>{
    setDialogInput(true)
  }} className="bg-black text-white p-4 rounded-lg" >Add Question</div></DialogTrigger>
  {addedQuestions.length > 0 && (
        <div className=" bg-black text-white">
          <h1>Added Questions:</h1>
          <ul className="flex flex-col justify-center items-center gap-4">
            {addedQuestions.map((input, index) => (
              <li key={index}>{`${input.text} - ${input.type}`}</li>
            ))}
          </ul>
        </div>
      )}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Input</DialogTitle>
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

<button className="bg-black text-white p-4 rounded-lg"  onClick={()=>{
  handleSubmit2();
  setDialogInput(false);
 
}}>
  
  Add Input Section
</button>

     
     </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


      </div>
      </>):(<>  <div className=" flex flex-col text-xl min-w-[100%] flex-wrap gap-3 items-center">
        <label className="text-black"> Enter the Title of the Quiz</label>
        <input
            id="title"
            onChange={(e) => handleInputChange("title", e.target.value)}
        className="text-black border-4 " type="text"></input>
        <label className="text-black"> Enter the description of the Quiz</label>
         <input
            id="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
        className="text-black border-4 " type="text"></input>
            <div className=" flex flex-row justify-center items-center">
            <label className="text-black"> Start time :-</label>
        <input
            id="startTime"
            onChange={(e) => handleInputChange("startTime", e.target.value)}
        className="text-black border-4 " type="date"></input>
            </div>
            <div className=" flex flex-row justify-center items-center">
            <label className="text-black"> End time :-</label>
        <input
            id="endTime"
            onChange={(e) => handleInputChange("endTime", e.target.value)}
        className="text-black border-4 " type="date"></input>
            </div>
            <div className=" flex flex-row justify-center items-center">
            <label className="text-black"> Duration :-</label>
        <input
            id="duration"
            onChange={(e) => handleInputChange("duration", e.target.value)}
        className="text-black border-4 " type="number"></input>
            </div>
        
        <button onClick={()=>{
          handleSubmit();
       
        }} className="bg-black text-white rounded-xl p-4" >Done</button>

       </div></>)
       }

       
     
      </DialogDescription>
     </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

     
<createdQuizes/>
     </div>
     
    


     </div>
    </div>
    </div>
)

}

export default Home;

