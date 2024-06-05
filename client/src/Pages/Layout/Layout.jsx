// import './App.css'
import QuizPage from '../QuizPage/QuizPage.jsx'
// import AllQuiz from '../Pages/AllQuiz/AllQuiz'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Login from '../Auth/Login/Login.jsx'
import Signup from '../Auth/Signup/Signup.jsx'
// import TakeQuiz from '../Pages/TakeQuiz/TakeQuiz'
import PrivateRoutes from '../../utils/PrivateRoutes.jsx'
import YourQuiz from '../YourQuiz/YourQuiz.jsx'
import Analytics from '../Analytics/Analytics.jsx'
import BuyCourse from '../BuyCourse/index.jsx'
import Home from '../HomePage/Home.jsx'
import Footer from '../../components/footer/Footer'
import Allcontest from '../AllContest/Allcontest.jsx'
import Pricing from '../Pricing/Pricing.jsx'
import { plansdata } from '../../assets/data/plansdata.js'
import Contact from '../Contact/Contact.jsx'
import ContestDetails from '../ContestDetails/ContestDetails.jsx'
import SideNavbar from '../../components/Navbar/Sidenavbar.jsx'
import ContestQuestion from '../ContestQuestion/Contestquestion.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useEffect, useState } from 'react'

function Layout() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (

        <>
            <div className="desktop-navbar">
                <Navbar />
            </div>
            <div className="mobile-navbar">
                <SideNavbar />
            </div>
            <Routes>

                <Route path='/contest' element={<Allcontest />} />
                <Route path='/pricing' element={<Pricing plansdata={plansdata} />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/' element={<Home />} />
                <Route element={<PrivateRoutes />} >
                    <Route path='/contest/:id' element={<ContestDetails />} />
                    <Route path='/contestquestion/:id' element={<ContestQuestion />} />
                    {/* <Route path="/your-quizzes" element={<YourQuiz />} /> */}
                    {/* <Route path="/analytics/:id" element={<Analytics />} /> */}
                </Route>
                {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/payment" element={<BuyCourse />} /> */}
            </Routes>
            <Footer />
        </>
    )
}


export default Layout