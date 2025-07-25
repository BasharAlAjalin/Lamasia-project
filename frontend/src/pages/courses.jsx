import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course.id} className="list-group-item">
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Courses;
