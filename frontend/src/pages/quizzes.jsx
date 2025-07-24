import { useState } from "react";

export default function Quizzes() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: send `answer` to backend
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-2">What is React?</label>
            <textarea
              className="w-full border p-2"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              required
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Answer
          </button>
        </form>
      ) : (
        <div className="text-green-500 font-semibold">
          Answer submitted! (Simulated)
        </div>
      )}
    </div>
  );
}
