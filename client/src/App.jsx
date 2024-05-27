import './App.css'
import QuizPage from './Pages/QuizPage/QuizPage'
import AllQuiz from './Pages/AllQuiz/AllQuiz'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Signup/Signup'
import TakeQuiz from './Pages/TakeQuiz/TakeQuiz'
import PrivateRoutes from './utils/PrivateRoutes'
import YourQuiz from './Pages/YourQuiz/YourQuiz'
import Analytics from './Pages/Analytics/Analytics'
import BuyCourse from './Pages/BuyCourse'
import Home from './Pages/HomePage/Home'
import Footer from './components/footer/Footer'
import Allcontest from './Pages/AllContest/Allcontest.jsx'
import Pricing from './Pages/Pricing/Pricing.jsx'
import { plansdata } from './assets/data/plansdata.js'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contest' element={<Allcontest />} />
        <Route path='/pricing' element={<Pricing plansdata={plansdata} />} />
        {/* <Route path="/" element={<AllQuiz />} /> */}
        <Route element={<PrivateRoutes />} >
          <Route path="/take-quiz/:id" element={<TakeQuiz />} />
          <Route path="/your-quizzes" element={<YourQuiz />} />
          <Route path="/analytics/:id" element={<Analytics />} />
        </Route>

        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<BuyCourse />} />
      </Routes>
      <Footer />
    </>
  )
}


export default App
