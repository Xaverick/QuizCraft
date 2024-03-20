import './App.css'
import QuizPage from './Pages/QuizPage/QuizPage'
import AllQuiz from './Pages/AllQuiz/AllQuiz'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Signup/Signup'

function App() {
  return (
    <>

    <Navbar />
    <Routes>
      <Route path="/" element={<AllQuiz />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes> 
    </>
  )
}


export default App
