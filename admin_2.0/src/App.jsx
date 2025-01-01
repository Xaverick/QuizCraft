import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

// pages
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import CreateQuiz from "./Pages/CreateQuiz/CreateQuiz";
import Edit from "./Pages/Edit/Edit";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import CreateChallenge from "./Pages/CreateChallenge/CreateChallenge";
import AddRewards from "./Pages/AddRewards/AddRewards";
import CreateReward from "./Pages/CreateReward/CreateReward";
import Referrals from "./Pages/Referrals/Referrals";

// components
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/quiz/:id" element={<ProtectedRoute element={Quiz} />} />

        <Route
          path="/create-challenge"
          element={<ProtectedRoute element={CreateChallenge} />}
        />

        <Route
          path="/create-quiz"
          element={<ProtectedRoute element={CreateQuiz} />}
        />

        <Route
          path="/create-reward"
          element={<ProtectedRoute element={CreateReward} />}
        />

        <Route
          path="/referrals"
          element={<ProtectedRoute element={Referrals} />}
        />

        <Route
          path="/add-rewards/:quizId"
          element={<ProtectedRoute element={AddRewards} />}
        />

        <Route
          path="/quiz/edit/:id"
          element={<ProtectedRoute element={Edit} />}
        />

        <Route path="/users" element={<ProtectedRoute element={Users} />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
