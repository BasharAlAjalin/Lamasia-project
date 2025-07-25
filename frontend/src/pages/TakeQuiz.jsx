import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestionsByQuiz, submitQuiz } from "../api/api";

function TakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestionsByQuiz(quizId).then(setQuestions);
  }, [quizId]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    const submissionData = {
      quizId: parseInt(quizId),
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer,
      })),
    };

    await submitQuiz(submissionData);
    alert("Quiz submitted successfully!");
    navigate("/profile");
  };

  return (
    <div className="container mt-4">
      <h3>Take Quiz #{quizId}</h3>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((q, index) => (
            <div key={q.id} className="mb-3">
              <label className="form-label">
                {index + 1}. {q.text}
              </label>
              <input
                className="form-control"
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            </div>
          ))}
          <button className="btn btn-success" type="submit">
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
}

export default TakeQuiz;
