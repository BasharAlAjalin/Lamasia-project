import React from "react";

export default function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-3 fw-bold mb-3 text-primary">
        Welcome to La Masia School
      </h1>
      <p className="lead text-muted">
        Empowering education through interactive courses and smart quizzes.
        Built with React and Spring Boot.
      </p>
      <div className="mt-4">
        <a href="/courses" className="btn btn-primary btn-lg me-3">
          Browse Courses
        </a>
        <a href="/quizzes" className="btn btn-outline-secondary btn-lg">
          Take a Quiz
        </a>
      </div>
    </div>
  );
}
