import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/api";
import { Link } from "react-router-dom";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes().then(setQuizzes);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Quizzes</h2>
      <ul className="list-group">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {quiz.title}
            <Link to={`/take-quiz/${quiz.id}`} className="btn btn-sm btn-primary">
              Take Quiz
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Quizzes;
