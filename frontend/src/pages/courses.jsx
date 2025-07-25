import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course.id} className="list-group-item">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
