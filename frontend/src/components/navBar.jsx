import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          La Masia
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quizzes" className="nav-link">
                Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <button onClick={logout} className="btn btn-danger">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-success">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
