import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../api/api";
import { enrollInCourse } from "../api/enrollmentApi";
import { useAuth } from "../auth/authContext";

function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourseDetails(id).then(setCourse).catch(console.error);
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollInCourse(user.id, id);
      setEnrolled(true);
    } catch {
      setError("Enrollment failed. Maybe already enrolled.");
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{course.name}</h2>
      <p>{course.description}</p>

      {user?.role === "STUDENT" && !enrolled && (
        <button className="btn btn-primary mb-3" onClick={handleEnroll}>
          Enroll in this course
        </button>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <h4>Content</h4>
      {course.contentList?.length > 0 ? (
        <ul className="list-group">
          {course.contentList.map((content) => (
            <li key={content.id} className="list-group-item">
              <strong>{content.title}</strong> ({content.type})<br />
              <a href={content.url} target="_blank" rel="noreferrer">
                View
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}

export default CourseDetails;
