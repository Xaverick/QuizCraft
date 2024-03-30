import { useEffect, useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import { useSelector } from "react-redux";

import { Link } from "lucide-react";


const AddQuiz = () => {

    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] =useState(new Date() );
    

// Your API URL
const { toast } = useToast();
const [dialogInput, setDialogInput] = useState(false);
const apiUrl = "http://localhost:4000";
const [drawerClose, setDrawerClose] = useState(false);
const { user } = useSelector((state) => state.profile)
    const [noOfInputs,setNoOfInputs]=useState("0");
    const [addInput,setAdd]=useState(false);
   
    const [addedQuestions, setaddedQuestions] = useState([]);
  const [quizData, setQuizData] = useState({ 
    title: "",
    description: "",
    startTime: startdate,
    endTime: enddate,
    duration: "",
    adminId: user ? user._id : null
  });
  const [quesionData, setQuestionData] = useState({
    quizId: "",
    text: "",
    type: "text",
    options: [] ,
    correctOption:""
   
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
        alert("Question added Successfully")
       

      } else {
        console.error("failed. Status:", response.status);
      }
     

    } catch (error) {
      console.error("Failed", error);
    }
  };


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
          const updatedquesionData = { ...prevquesionData,    quizId: data.quizId };
          setAdd(true);
          setDrawerClose(true);
         alert("Quiz Created Successfully")
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
    <Drawer>
                  <DrawerTrigger><div className=" bg-yellow-400 text-black w-[100%] p-4 rounded-lg hover:bg-yellow-500">Create New Quiz</div></DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Quiz</DrawerTitle>
                      <DrawerDescription>   {
                      addInput?(<>
                      
                      <div className="text-xl flex max-h-[500px] overflow-y-scroll  flex-col gap-4">
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
                  

                  
                </select>

                {
                  quesionData.type=="radio"?(<>
                  <label>Enter the no of radio buttons you want</label>
                  <input onChange={(e)=>{
                setNoOfInputs(e.target.value);
                  }} name="options" className=" border-2" type="number"></input>
                  {Array.from({ length: Number(noOfInputs) }).map((_, index) => (
                    <div className=" flex flex-row items-center justify-center gap-[40px]" key={index}>
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
                      </>):(<>  <div className=" flex flex-col text-xl min-w-[100%] overflow-scroll max-h-[500px]  items-center gap-3 ">
                        <label className="text-black"> Enter the Title of the Quiz</label>
                        <input
                            id="title"
                            onChange={(e) => handleInputChange("title", e.target.value)}
                        className="text-black border-4 " type="text"></input>
                        <label className="text-black"> Enter the description of the Quiz</label>
                        <textarea
                    id="description"
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="text-black border-4 min-h-[150px] w-[400px]"

                />
                            <div className=" flex flex-row justify-center items-center">
                            <label className="text-black"> Start time :-</label>
                            <Calendar
                    mode="single"
                    selected={startdate}
                    onSelect={setStartDate}
                    className="rounded-md border"
                  />
                            </div>
                            <div className=" flex flex-row justify-center items-center">
                            <label className="text-black"> End time :-</label>
                            <Calendar 
                    mode="single"
                    selected={enddate}
                    onSelect={setEndDate}
                    className="rounded-md border"
                  />
                            </div>
                            <div className=" flex flex-row justify-center items-center">
                            <label className="text-black"> Duration :-</label>
                        <input
                            id="duration"
                            onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="text-black border-4 " type="number"></input>
                            </div>
                        
                            <Button onClick={()=>{
                          handleSubmit();
                      
                        }} >Submit</Button>

                      </div></>)
                      }
                </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                    
                      <DrawerClose>
                        {
                          drawerClose
                        }
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

  )
}

export default AddQuiz






