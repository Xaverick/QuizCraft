import "./App.css";
import Layout from "./Pages/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import ContestQuestion from "./Pages/ContestQuestion/Contestquestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import ScrollToTop from "./components/Scrolltotop/ScrollToTop";
import MyProfile from "./Pages/MyProfile/MyProfile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ReqProfile from "./Pages/ReqProfile/ReqProfile";
import Comingsoon from "./Pages/ComingSoon/Comingsoon";
import MyContests from "./Pages/MyContests/MyContests";
// import ScrollToTop from './components/Scrolltotop/ScrollToTop'
// import { useEffect } from 'react'

const App = () => {
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === 'F12') {
  //       event.preventDefault();
  //     }
  //     if (event.ctrlKey && event.shiftKey && event.key === 'I') {
  //       event.preventDefault();
  //     }
  //     if (event.ctrlKey && event.shiftKey && event.key === 'C') {
  //       event.preventDefault();
  //     }
  //     if (event.ctrlKey && event.shiftKey && event.key === 'J') {
  //       event.preventDefault();
  //     }
  //     if (event.ctrlKey && event.key === 'U') {
  //       event.preventDefault();
  //     }
  //   };

  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);
  return (
    <>
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/contestquestion/:id" element={<ContestQuestion />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:userID" element={<ReqProfile />} />
          <Route path="/my-contests" element={<MyContests />} />
        </Route>

        <Route path="/*" element={<Layout />} />
      </Routes>
    </>
  );
};

export default App;
