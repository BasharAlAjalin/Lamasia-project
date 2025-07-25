import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await fetchCourses();
        setCourses(coursesData);
      } catch (err) {
        setError("No courses to display. Please try again later.");
        // console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleEnrollClick = (courseId) => {
    if (!user) {
      // This shouldn't happen since button is conditional, but just in case
      return;
    }
    // Handle enrollment logic here
    console.log(`Enrolling in course ${courseId}`);
    // You can add API call to enroll user in course
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Courses</h2>
            <p className="text-gray-600">Please wait while we fetch the latest courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-4">
              <span className="text-3xl">😕</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sorry, No courses today</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of courses designed to enhance your skills and knowledge. 
            Start your learning journey today!
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Available</h3>
            <p className="text-gray-600">Check back later for new courses!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Course Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>

                {/* Course Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {course.name || course.title || "Course Title"}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.description || "Enhance your skills with this comprehensive course designed for learners of all levels."}
                  </p>
                </div>

                {/* Action Button - Conditional based on authentication */}
                {user ? (
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group-hover:shadow-lg"
                  >
                    Enroll Me
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                  >
                    Login to Enroll
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Call to Action Section */}
        {courses.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of students who are already advancing their careers with our expert-designed courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quizzes"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Take a Quiz
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
