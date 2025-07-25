const API_BASE = "http://localhost:8080/api/questions";

export async function fetchQuestionsByQuiz(quizId) {
  const res = await fetch(`${API_BASE}/quiz/${quizId}`);
  return res.json();
}

export async function addQuestionToQuiz(quizId, questionData) {
  const res = await fetch(`${API_BASE}/quiz/${quizId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionData),
  });
  return res.json();
}

export async function deleteQuestion(questionId) {
  await fetch(`${API_BASE}/${questionId}`, {
    method: "DELETE",
  });
}
