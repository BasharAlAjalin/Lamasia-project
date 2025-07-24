import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Courses from "./pages/courses";
import Quizzes from "./pages/quizzes";
import Profile from "./pages/profile";
import Login from "./components/logIn";
import SignUp from "./components/signUp";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
