const API_BASE = "http://localhost:8080/api";

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Auth APIs
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

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

// Get courses by instructor
export async function getCoursesByInstructor(instructorId) {
  const res = await fetch(`${API_BASE}/courses/instructor/${instructorId}`);
  if (!res.ok) throw new Error("Failed to fetch instructor courses");
  return res.json();
}

// Quiz APIs
export async function fetchQuizzes() {
  const res = await fetch(`${API_BASE}/quizzes`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function fetchQuizById(quizId) {
  const res = await fetch(`${API_BASE}/quizzes/${quizId}`);
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
}

export async function createQuiz(courseId, quiz) {
  const res = await fetch(`${API_BASE}/quizzes/course/${courseId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(quiz),
  });
  if (!res.ok) throw new Error("Failed to create quiz");
  return res.json();
}

export async function fetchQuizzesByCourse(courseId) {
  const res = await fetch(`${API_BASE}/quizzes/course/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch course quizzes");
  return res.json();
}

export async function deleteQuiz(quizId) {
  const res = await fetch(`${API_BASE}/quizzes/${quizId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete quiz");
  return { success: true };
}

// Alias for createQuiz - adds quiz to a specific course
export async function addQuizToCourse(courseId, quiz) {
  const res = await fetch(`${API_BASE}/quizzes/course/${courseId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(quiz),
  });
  if (!res.ok) throw new Error("Failed to add quiz to course");
  return res.json();
}

// Question APIs
export async function fetchQuestionsByQuiz(quizId) {
  const res = await fetch(`${API_BASE}/questions/quiz/${quizId}`);
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function createQuestion(question) {
  const res = await fetch(`${API_BASE}/questions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(question),
  });
  if (!res.ok) throw new Error("Failed to create question");
  return res.json();
}

export async function updateQuestion(questionId, question) {
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(question),
  });
  if (!res.ok) throw new Error("Failed to update question");
  return res.json();
}

export async function deleteQuestion(questionId) {
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete question");
  return { success: true };
}

// Add question to a specific quiz
export async function addQuestionToQuiz(quizId, question) {
  const questionWithQuiz = { ...question, quizId: parseInt(quizId) };
  const res = await fetch(`${API_BASE}/quizzes/${quizId}/questions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(question),
  });
  if (!res.ok) throw new Error("Failed to add question to quiz");
  return res.json();
}

// Enrollment APIs
export async function enrollInCourse(studentId, courseId) {
  const res = await fetch(`${API_BASE}/enrollments/enroll?studentId=${studentId}&courseId=${courseId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to enroll");
  return res.json();
}

export async function getMyEnrollments(studentId) {
  const res = await fetch(`${API_BASE}/enrollments/student/${studentId}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return res.json();
}

export async function unenrollFromCourse(studentId, courseId) {
  const res = await fetch(`${API_BASE}/enrollments/unenroll?studentId=${studentId}&courseId=${courseId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to unenroll");
  return { success: true };
}

// Submission APIs
export async function submitQuiz(submissionId, answers) {
  const res = await fetch(`${API_BASE}/quizzes/submissions/${submissionId}/submit`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(answers),
  });
  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
}

export async function getSubmissionsByUser(userId) {
  const res = await fetch(`${API_BASE}/quizzes/submissions/student/${userId}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}

// Course Content APIs
export async function uploadContent(courseId, title, type, url) {
  const res = await fetch(`${API_BASE}/contents/upload?courseId=${courseId}&title=${title}&type=${type}&url=${url}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to upload content");
  return res.json();
}

export async function getCourseContent(courseId) {
  const res = await fetch(`${API_BASE}/contents/course/${courseId}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch course content");
  return res.json();
}

// User Management APIs
export async function fetchAllUsers() {
  const res = await fetch(`${API_BASE}/users`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function updateUserRole(userId, newRole) {
  const res = await fetch(`${API_BASE}/users/${userId}/role`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ role: newRole }),
  });
  if (!res.ok) throw new Error("Failed to update user role");
  return res.json();
}

export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return { success: true };
}

// Additional Quiz APIs
export async function startQuizAttempt(quizId, studentId) {
  const res = await fetch(`${API_BASE}/quizzes/${quizId}/start?studentId=${studentId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to start quiz attempt");
  return res.json();
}

export async function addOptionToQuestion(questionId, option) {
  const res = await fetch(`${API_BASE}/quizzes/questions/${questionId}/options`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(option),
  });
  if (!res.ok) throw new Error("Failed to add option to question");
  return res.json();
}
