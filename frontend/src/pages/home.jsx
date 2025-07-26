import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full py-0 px-0 sm:px-0 lg:px-0 bg-cover bg-center bg-no-repeat select-none"
      style={{
        backgroundImage:
          "url(https://static01.nyt.com/athletic/uploads/wp/2024/04/19074043/GettyImages-1235397392-scaled.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "auto",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Softer, lighter overlay for subtle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-purple-100/20 to-blue-100/20 z-0" />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">LM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-300 mb-2 drop-shadow-lg">
            Welcome to La Masia School
          </h1>
          <p className="text-white mb-6 drop-shadow text-2xl ">
            Empowering education through interactive courses and smart quizzes.
            <br />
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl p-8 border border-gray-200 shadow-2xl flex flex-col items-center space-y-4 backdrop-blur-md">
          <Link
            to="/courses"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mb-2"
          >
            Browse Courses
          </Link>
          <Link
            to="/quizzes"
            className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
