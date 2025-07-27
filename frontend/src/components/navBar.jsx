import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

function NavBar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";
  const isInstructor = user?.role === "INSTRUCTOR";

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LM</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
              La Masia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/quizzes"
              className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Quizzes
            </Link>
            
            {/* Profile link for all logged-in users */}
            {user && (
              <Link
                to="/profile"
                className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Profile
              </Link>
            )}
            
            {/* Role-specific links */}
            {isUser && (
              <Link
                to="/my-enrollments"
                className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                My Enrollments
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Admin Panel
              </Link>
            )}
            {isInstructor && (
              <Link
                to="/upload-content"
                className="text-white no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Upload Content
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 bg-white/10 px-3 py-1 rounded-full text-sm">
                  Hello,{" "}
                  <span className="text-purple-300 font-medium">
                    {user.name}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
              >
                Courses
              </Link>
              <Link
                to="/quizzes"
                className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
              >
                Quizzes
              </Link>
              
              {/* Profile link for all logged-in users */}
              {user && (
                <Link
                  to="/profile"
                  className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Profile
                </Link>
              )}
              
              {/* Role-specific links */}
              {isUser && (
                <Link
                  to="/my-enrollments"
                  className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  My Enrollments
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Admin Panel
                </Link>
              )}
              {isInstructor && (
                <Link
                  to="/upload-content"
                  className="text-gray-300 no-underline hover:no-underline hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Upload Content
                </Link>
              )}
              <div className="pt-4 border-t border-purple-500/20 mt-4">
                {user ? (
                  <>
                    <div className="text-gray-300 px-3 py-2 text-sm">
                      Hello,{" "}
                      <span className="text-purple-300 font-medium">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-2 rounded-lg transition-all duration-200 mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-purple-300 no-underline hover:no-underline hover:text-white border border-purple-500/50 hover:bg-purple-500/20 px-3 py-2 rounded-lg transition-all duration-200 mb-2"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white no-underline hover:no-underline px-3 py-2 rounded-lg transition-all duration-200 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
