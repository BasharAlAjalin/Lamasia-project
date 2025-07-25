import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Quizzes from "./pages/Quizzes";
import SubmitQuiz from "./pages/submitQuiz";
import Login from "./components/logIn";
import Signup from "./components/signUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/submit/:quizId" element={<SubmitQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
