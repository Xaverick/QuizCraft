// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Login from '../Auth/Login/Login.jsx'
import Signup from '../Auth/Signup/Signup.jsx'
import PrivateRoutes from '../../utils/PrivateRoutes.jsx'
import YourQuiz from '../YourQuiz/YourQuiz.jsx'
// import Analytics from '../Analytics/Analytics.jsx'
// import BuyCourse from '../BuyCourse/index.jsx'
import Home from '../HomePage/Home.jsx'
import Footer from '../../components/footer/Footer'
import Allcontest from '../AllContest/Allcontest.jsx'
import Contest from '../Contests/Contest.jsx'
import Pricing from '../Pricing/Pricing.jsx'
import { plansdata } from '../../assets/data/plansdata.js'
import Contact from '../Contact/Contact.jsx'
import ContestDetails from '../ContestDetails/ContestDetails.jsx'
import SideNavbar from '../../components/Navbar/Sidenavbar.jsx'
// import ContestQuestion from '../ContestQuestion/Contestquestion.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useEffect, useState } from 'react'
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Comingsoon from '../ComingSoon/Comingsoon.jsx'


function Layout() {
    // const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (

        <div className='main_app'>
            <ToastContainer />
            <div className="desktop-navbar">
                <Navbar />
            </div>
            <div className="mobile-navbar">
                <SideNavbar />
            </div>
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/contests' element={<Allcontest />} />
                <Route path='/contests/:type' element={<Contest />} />
                <Route path='/pricing' element={<Pricing plansdata={plansdata} />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/contact' element={<Contact />} />
                <Route element={<PrivateRoutes />} >
                    {/* <Route path='/contestquestion/:id' element={<ContestQuestion />} /> */}
                    <Route path='/contest/:id' element={<ContestDetails />} />
                    <Route path="/your-quizzes" element={<YourQuiz />} />
                    {/* <Route path="/analytics/:id" element={<Analytics />} /> */}
                </Route>
                {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/payment" element={<BuyCourse />} /> */}



                <Route path="/*" element={"page not found"} />
            </Routes>
            <Footer />
        </div>
    )
}


export default Layout
