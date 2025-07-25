const API_BASE = "http://localhost:8080/api/quizzes";

export async function fetchQuizzesByCourse(courseId) {
  const res = await fetch(`${API_BASE}/course/${courseId}`);
  return res.json();
}

export async function addQuizToCourse(courseId, quizData) {
  const res = await fetch(`${API_BASE}/course/${courseId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizData),
  });
  return res.json();
}
