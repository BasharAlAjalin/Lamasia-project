import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchQuestionsByQuiz,
  addQuestionToQuiz,
  deleteQuestion,
} from "../api/api";

function ManageQuestions() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    fetchQuestionsByQuiz(quizId).then(setQuestions);
  }, [quizId]);

  const handleAdd = async () => {
    if (!text || options.some((opt) => !opt) || !correctAnswer) return;

    const newQuestion = {
      text,
      options,
      correctAnswer,
    };

    const saved = await addQuestionToQuiz(quizId, newQuestion);
    setQuestions([...questions, saved]);

    setText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Manage Questions for Quiz #{quizId}</h3>

      <ul className="list-group mb-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{q.text}</strong>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>
                    {opt}{" "}
                    {opt === q.correctAnswer && <strong>(Correct)</strong>}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(q.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h5>Add New Question</h5>
      <input
        className="form-control mb-2"
        placeholder="Question text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="form-control mb-2"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) =>
            setOptions((prev) => {
              const updated = [...prev];
              updated[i] = e.target.value;
              return updated;
            })
          }
        />
      ))}
      <input
        className="form-control mb-2"
        placeholder="Correct answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Add Question
      </button>
    </div>
  );
}

export default ManageQuestions;
