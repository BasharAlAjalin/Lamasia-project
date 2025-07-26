import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizzesByCourse, addQuizToCourse } from "../api/quizApi";

function InstructorCourseQuizzes() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    fetchQuizzesByCourse(courseId).then(setQuizzes);
  }, [courseId]);

  const handleAddQuiz = async () => {
    if (!quizTitle) return;
    const newQuiz = await addQuizToCourse(courseId, { title: quizTitle });
    setQuizzes([...quizzes, newQuiz]);
    setQuizTitle("");
  };

  return (
    <div className="container mt-4">
      <h3>Quizzes for Course #{courseId}</h3>

      <ul className="list-group mb-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="list-group-item">
            {quiz.title}
          </li>
        ))}
      </ul>

      <div className="input-group">
        <input
          className="form-control"
          placeholder="New Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddQuiz}>
          Add Quiz
        </button>
      </div>
    </div>
  );
}

export default InstructorCourseQuizzes;
