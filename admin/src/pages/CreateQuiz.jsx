
//components
import Navbar from "@/components/ui/Navbar"

const CreateQuiz = () => {
  return (
    <div className="max-w-screen max-h-screen w-screen h-screen bg-white ">
      <div className="w-screen overflow-x-hidden flex flex-col items-center justify-center h-screen">
        <div className="w-[100%] h-[100%] bg-white text-white ">
          <nav className="mx-auto">
            <Navbar />
          </nav>
        </div>
      </div>
    </div> 
  )
}

export default CreateQuiz