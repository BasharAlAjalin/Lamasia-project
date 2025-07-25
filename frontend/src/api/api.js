const API_BASE = "http://localhost:8080/api";

export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  return res.json();
}

export async function fetchQuizzes() {
  const res = await fetch(`${API_BASE}/quizzes`);
  return res.json();
}

export async function fetchQuestionsByQuiz(quizId) {
  const res = await fetch(`${API_BASE}/questions/quiz/${quizId}`);
  return res.json();
}

export async function submitQuiz(submissionData) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submissionData),
  });
  return res.json();
}
