import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary fw-bold">
        Welcome to La Masia School
      </h1>
      <p className="lead text-muted">
        Empowering education through interactive courses and smart quizzes.
        Built with React and Spring Boot.
      </p>
      <div className="mt-4">
        <Link to="/courses" className="btn btn-primary me-3">
          Browse Courses
        </Link>
        <Link to="/quizzes" className="btn btn-outline-secondary">
          Take a Quiz
        </Link>
      </div>
    </div>
  );
}

export default Home;
