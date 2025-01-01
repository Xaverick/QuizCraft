import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';

//pages
import Home from './pages/Home'
import SignInForm from './pages/login';
import Quiz from './pages/Quiz';
import CreateQuiz from './pages/CreateQuiz';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />} >
            <Route path='/' element={<Home />}/>
            <Route path='/create-quiz' element={<CreateQuiz />}/>
            <Route path='/quiz/:id' element={<Quiz />}/>
        </Route>
        <Route path='/login' element={<SignInForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
