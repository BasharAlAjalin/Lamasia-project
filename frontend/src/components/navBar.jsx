import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-gray-900 text-white">
      <Link to="/" className="font-bold text-lg">
        LMS
      </Link>
      <div className="space-x-4">
        <Link to="/courses">Courses</Link>
        <Link to="/quizzes">Quizzes</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
