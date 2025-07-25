import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          La Masia
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
          <div className="d-flex">
            {user ? (
              <>
                <span className="navbar-text me-2">Hello, {user.name}</span>
                <button onClick={logout} className="btn btn-outline-light">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-success">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
