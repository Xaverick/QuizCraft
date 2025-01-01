import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//components
import Navbar from "@/components/ui/Navbar"
import SideBar from "../components/ui/SideBar";
import QuizSlected from "../components/selectedQuiz";

const Quiz = () => {

  const { id } = useParams();

  const [editQuiz, setEditQuiz] = useState(false);
  const [addQuiz, setAddQuiz] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.profile);
  const [userQuizes, setUserQuizes] = useState([]);
  const [selectedQuiz, setSelectedQuizes] = useState();
  const [isFormDetailsDialogOpen, setFormDetailsDialogOpen] = useState(false);
  const [response2, setResponse] = useState([]);
  const [questions, setQuestionDatas] = useState([]);
  const [refresh, setRefresh] = useState(false);


  const fetchQuizDetails = async (quizId) => {
    const fetchQuestionDetails = async (questionId) => {
      try {
        const response = await fetch(
          `${apiUrl}/admin/getquestion/${questionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuestionDatas((prevData) => [...prevData, data]);
          console.log("Question details -:" + questions);
        } else {
          console.error("Failed to fetch question. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
    };

    try {
      console.log(quizId);
      const response = await fetch(`${apiUrl}/admin/getquiz/${quizId}`, {
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
      console.log("id of the quiz is", quizId);
      setFormDetailsDialogOpen(true);

      // Fetch and display input details for each input
      data.questions.forEach((question) => {
        console.log(question);
        fetchQuestionDetails(question);
      });
    } catch (error) {
      console.error("Failed to fetch responses:", error);
    }
  };

  useEffect(() => {
    fetchQuizDetails(id);
  }, [id]);


  return (
    <div className="max-w-screen max-h-screen w-screen h-screen bg-white ">
      <div className="w-screen overflow-x-hidden flex flex-col items-center justify-center h-screen">
        <div className="w-[100%] h-[100%] bg-white text-white ">
          <nav className="mx-auto">
            <Navbar />
          </nav>

          <div className="flex flex-col h-[100%] items-center justify-center w-[100%] ">
            {user ? (
              <>
                <div className="z-10 mx-auto flex h-[100%] items-center justify-around w-[100%]">

                  <SideBar />

                  <div className=" flex items-start justify-between w-[100%] h-[100%]">
                    <div className="flex w-[100%] h-[100%] border-l-2 border-l-yellow-300 bg-white text-black">
                          <QuizSlected
                            setEditQuiz={setEditQuiz}
                            selectedQuiz={selectedQuiz}
                            fetchQuiz={fetchQuizDetails}
                            questions={questions}
                            quizId={id}
                            refresh={refresh}
                            setRefresh={setRefresh}
                          />
                    </div>
                  </div>
                </div>
              </>)
              :
              (<>
                <div className=" flex flex-col items-center justify-center gap-4">
                  <h1 className="text-3xl text-black">You need to login to create a quiz</h1>
                  <button className="text-white bg-black p-4 rounded-xl" onClick={() => {
                    window.location.href = "/login"
                  }}>LogIn</button>
                </div>
              </>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz