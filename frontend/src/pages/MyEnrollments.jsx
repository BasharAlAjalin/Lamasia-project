import { useEffect, useState } from "react";
import { getMyEnrollments } from "../api/enrollmentApi";
import { useAuth } from "../auth/authContext";

function MyEnrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (user) {
      getMyEnrollments(user.id).then(setEnrollments).catch(console.error);
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>My Enrolled Courses</h2>
      {enrollments.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <ul className="list-group">
          {enrollments.map((e) => (
            <li key={e.id} className="list-group-item">
              {e.course.name}{" "}
              {e.completed && (
                <span className="badge bg-success">Completed</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEnrollments;
