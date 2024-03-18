import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const createdQuizes=()=> {  

    const { user } = useSelector((state) => state.profile)
    const [userForms, setUserForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState();
    const     [quizId, setquizId] = useState("");
    const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
    const [response2, setResponse] = useState([]);
    const [inputs2, setQuestionDatas] = useState([]);
    useEffect(() => {
        if (user) {
          fetchUserQuizes();
        }
      }, [user]);
      const handleQuizClick = (quizId) => {
        // Fetch and display form details when a form is clicked
        fetchQuizDetails (quizId);
           console.log("id of the form is", quizId);
      };

      const fetchUserQuizes = async () => {
        try {
          const response = await fetch(`${apiUrl}/admin/getQuizeByAdminId/${user}`, {
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

   
    const fetchQuizDetails = async () => {

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
      

   
          
    return (
        <div>
           <h2 className="text-xl ">Your Quizes:</h2>
<div className="flex flex-row w-[70%] flex-wrap justify-center gap-4 items-center text-white">
        
          {userForms.map((form) => (
            <div  key={form._id} className=" flex gap-4 flex-col items-center justify-center">
              <div
             
              className="cursor-pointer hover:bg-black flex-col hover:text-white transition-all duration-200 bg-white text-black w-[100px] h-[100px] flex items-center justify-center hover:underline"
            
              
            >
              <p   onClick={() => handleQuizClick(form._id)}>{form.title}</p>
             
      
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
    )
}

export default createdQuizes