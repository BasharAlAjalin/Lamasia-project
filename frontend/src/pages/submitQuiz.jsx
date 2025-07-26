import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionsByQuiz, submitQuiz } from "../api/api";

function SubmitQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestionsByQuiz(quizId).then(setQuestions);
  }, [quizId]);

  const handleChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
  const submissionData = { quizId, answers };
  try {
    const result = await submitQuiz(submissionData); 
    alert(`Quiz submitted successfully! Your score: ${result.score}/${questions.length}`);
  } catch {
    alert("Failed to submit quiz.");
  }
};
  return (
    <div className="container mt-4">
      <h2>Submit Quiz</h2>
      <form>
        {questions.map((q) => (
          <div key={q.id} className="mb-3">
            <label>{q.text}</label>
            <input
              type="text"
              className="form-control"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
}
export default SubmitQuiz;
