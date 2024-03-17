

import React, { useEffect, useState } from "react"


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
  

 
    const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
    const [userForms, setUserForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState();
    const     [quizId, setquizId] = useState("");
  
 
  
    const fetchUserForms = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/userForms?userId=${String(user?._id)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserForms(data.forms);
          console.log(userForms);
        } else {
          console.error("Failed to fetch user forms. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user forms:", error);
      }
    };
    
    const [response2, setResponse] = useState([]);
    const [inputs2, setQuestionDatas] = useState([]);

    // Trigger the fetchUserForms function when the component mounts or when the user state changes
    useEffect(() => {
      if (user) {
        fetchUserForms();
      }
    }, [user]);
    const handleFormClick = () => {
      // Fetch and display form details when a form is clicked
      fetchFormDetails (quizId);
         console.log("id of the form is", quizId);
    };
   
const fetchFormDetails = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/form/FormDetail    quizId=$    quizId}`);

    if (response.ok) {
      setQuestionDatas([]);
      setResponse([]);
      const data = await response.json();
      console.log(data);
      setSelectedForm(data.form);
      console.log(selectedForm);
      setquizId(data.form._id); 
      console.log("id of the form is",quizId);
      setFormDetailsDialogOpen(true);

      // Fetch and display input details for each input
      data.form.input.forEach(() => {
        fetchInputDetails(inputId);
      });

      // Fetch and display response details for each response
      data.form.response.forEach(() => {
        fetchResponseDetails(responseId);
      });
    } else {
      console.error("Failed to fetch responses. Status:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch responses:", error);
  }
};

    const fetchInputDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/getINputDetails?inputId=${inputId}`);
    
        if (response.ok) {
          const data = await response.json();
         console.log(data);
         setQuestionDatas((prevData) => [...prevData, data]);
        console.log(inputs2);
        } else {
          console.error("Failed to fetch input. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch input:", error);
      }
    };

    const fetchResponseDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/form/getResponseDetails?responseId=${responseId}`);
    
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
    };
    
    
    



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
  
  const handleInputChange2 = () => {
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

  const handleLogout = async () => {
    try {
      console.log(apiUrl);
      // Make a request to your server to invalidate the token and perform logout
      const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
        method: "POST", // or "GET" depending on your server implementation
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers (e.g., token)
          // ...
        },
        // Body can be empty for some logout implementations
        // body: JSON.stringify({}),
      });

      if (response.ok) {
        // Optionally, clear any user-related data from the frontend state
        console.log("Logout successful...");
        setUser("");
        localStorage.removeItem("token"); // Replace "yourTokenKey" with the actual key used to store the token
        localStorage.removeItem("user"); // Replace "yourTokenKey" with the actual key used to store the token


        // Redirect or perform any additional actions after successful logout
        // For example, you might redirect the user to the login page
        window.location.href = "/auth/login";
      } else {
        const errorData = await response.json();
        console.error("Error logging out:", errorData.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  const handleSubmit2 = async () => {
   
    console.log(quesionData);
    try {

      const response = await fetch(`${apiUrl}/api/v1/form/addInput`, {
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
        console.log("Form Created Successfully", data);
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
<h2 className="text-xl ">Your Quizes:</h2>
<div className="flex flex-row w-[70%] flex-wrap justify-center gap-4 items-center text-white">
        
          {userForms.map((form) => (
            <div  key={form._id} className=" flex gap-4 flex-col items-center justify-center">
              <div
             
              className="cursor-pointer hover:bg-black flex-col hover:text-white transition-all duration-200 bg-white text-black w-[100px] h-[100px] flex items-center justify-center hover:underline"
            
              
            >
              <p   onClick={() => handleFormClick(form._id)}>{form.title}</p>
             
      
            </div>
            <div onClick={ ()=>{
                handleDelete(form._id);
                
              }}> Delete </div>
            </div>
            
          ))}
        </div>
   <div className="bg-white text-black ">     {selectedForm ?(
        <div className=" overflow-scroll" onDoubleClick={()=>{
          setFormDetailsDialogOpen(false);
        }}>
           <Dialog  open={isFormDetailsDialogOpen} >
  <DialogContent className=" overflow-scroll h-[100%]">
    <DialogHeader>
     
    </DialogHeader>
    {/* Display all details of the form here */}
    <div className=" flex flex-col items-center justify-center bg-white text-black p-4 rounded-lg">
  <h2 className="text-xl text-black">Form Details:</h2>
  <p>Title: {selectedForm ? selectedForm.title : "N/A"}</p>
  <h3>Form:</h3>
  <div className="bg-black flex flex-col flex-wrap overflow-scroll justify-center items-center text-white p-4">
  {inputs2.map((form, formIndex) => (
  <div key={formIndex}>
  
    <form>
      {form.inputs.map((quesionData, index) => (
        <div className=" flex gap-4 items-center justify-center  mt-3" key={index}>
          <label>{quesionData.text}</label>
          {quesionData.type === 'text' && (
            <input className="text-black" type="text" />
          )}
          {quesionData.type === 'radio' && (
        <>
        {
          quesionData.options && quesionData.options.length > 0 && (
            <div>
              {quesionData.options.map((option) => (
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
          {quesionData.type === 'checkbox' && (
            <input className="text-black" type="checkbox" />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
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



  {/* Add more form details as needed */}
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
    


     </div>
    </div>
    </div>
)

}

export default Home;

