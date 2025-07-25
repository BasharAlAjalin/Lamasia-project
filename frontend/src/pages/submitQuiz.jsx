import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionsByQuiz, submitQuiz } from "../api/api";

function SubmitQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestionsByQuiz(quizId).then(setQuestions);
  }, [quizId]);

  const handleChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to submit a quiz.");
      return;
    }

    const submissionData = {
      userId: parseInt(userId),
      quiz: { id: parseInt(quizId) },
      answers: answers,
    };

    try {
      const res = await submitQuiz(submissionData);
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit quiz.");
    }
  };

  if (submitted) {
    return (
      <div className="container mt-4">
        <h3>Your Score: {score} / {questions.length}</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Submit Quiz</h2>
      <form>
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <h5>
              Q{index + 1}: {q.questionText}
            </h5>
            {[q.option1, q.option2, q.option3, q.option4].map((option, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleChange(q.id, option)}
                  required
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
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
