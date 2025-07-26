const BASE_URL = "http://localhost:8080/api/enrollments";

export async function enrollInCourse(studentId, courseId) {
  const res = await fetch(
    `${BASE_URL}/enroll?studentId=${studentId}&courseId=${courseId}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) throw new Error("Enrollment failed");
  return res.json();
}

export async function getMyEnrollments(studentId) {
  const res = await fetch(`${BASE_URL}/my-courses/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return res.json();
}
