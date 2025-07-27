const API_BASE = "http://localhost:8080/api";

// Course APIs
export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  return res.json();
}

export async function fetchCourseDetails(courseId) {
  const res = await fetch(`${API_BASE}/courses/${courseId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch course details");
  }
  return res.json();
}

// Quiz APIs
export async function fetchQuizzes() {
  const res = await fetch(`${API_BASE}/quizzes`);
  return res.json();
}

export async function fetchQuizzesByCourse(courseId) {
  const res = await fetch(`${API_BASE}/quizzes/course/${courseId}`);
  return res.json();
}

export async function addQuizToCourse(courseId, quizData) {
  const res = await fetch(`${API_BASE}/quizzes/course/${courseId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizData),
  });
  return res.json();
}

// Question APIs
export async function fetchQuestionsByQuiz(quizId) {
  const res = await fetch(`${API_BASE}/questions/quiz/${quizId}`);
  return res.json();
}

export async function addQuestionToQuiz(quizId, questionData) {
  const res = await fetch(`${API_BASE}/questions/quiz/${quizId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionData),
  });
  return res.json();
}

export async function deleteQuestion(questionId) {
  await fetch(`${API_BASE}/questions/${questionId}`, {
    method: "DELETE",
  });
}

// Submission APIs
export async function submitQuiz(submissionData) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submissionData),
  });
  return res.json();
}

// Enrollment APIs
export async function enrollInCourse(studentId, courseId) {
  const res = await fetch(
    `${API_BASE}/enrollments/enroll?studentId=${studentId}&courseId=${courseId}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) throw new Error("Enrollment failed");
  return res.json();
}

export async function getMyEnrollments(studentId) {
  const res = await fetch(`${API_BASE}/enrollments/my-courses/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return res.json();
}

// User Management APIs
export async function fetchAllUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function updateUserRole(userId, newRole) {
  const res = await fetch(`${API_BASE}/users/${userId}/role`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: newRole }),
  });
  if (!res.ok) throw new Error("Failed to update user role");
  return res.json();
}

export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}
