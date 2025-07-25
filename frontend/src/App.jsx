import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Courses from "./pages/courses";
import Quizzes from "./pages/quizzes";
import SubmitQuiz from "./pages/submitQuiz";
import Profile from "./pages/profile";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Unauthorized from "./pages/Unauthorized";
import UploadContent from "./pages/UploadContent";
import CourseDetails from "./pages/CourseDetails";
import MyEnrollments from "./pages/MyEnrollments";
import InstructorCourseQuizzes from "./pages/InstructorCourseQuizzes";
import ManageQuestions from "./pages/ManageQuestions";
import TakeQuiz from "./pages/TakeQuiz";

import Login from "./components/logIn";
import Signup from "./components/signUp";
import Navbar from "./components/navBar";
import PrivateRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated USER or ADMIN or INSTRUCTOR */}
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN", "INSTRUCTOR"]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN", "INSTRUCTOR"]}>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN", "INSTRUCTOR"]}>
              <CourseDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN", "INSTRUCTOR"]}>
              <Quizzes />
            </PrivateRoute>
          }
        />

        {/* USER-only */}
        <Route
          path="/submit-quiz"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <SubmitQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/take-quiz/:quizId"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <TakeQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-enrollments"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <MyEnrollments />
            </PrivateRoute>
          }
        />

        {/* ADMIN-only */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* INSTRUCTOR-only */}
        <Route
          path="/upload-content"
          element={
            <PrivateRoute allowedRoles={["INSTRUCTOR"]}>
              <UploadContent />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/quizzes"
          element={
            <PrivateRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorCourseQuizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/quizzes/:quizId/questions"
          element={
            <PrivateRoute allowedRoles={["INSTRUCTOR"]}>
              <ManageQuestions />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
