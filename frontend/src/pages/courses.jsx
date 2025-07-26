import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses").then((res) => {
      setCourses(res.data);
      setFilteredCourses(res.data); // نسخة للفلترة
    });
  }, []);

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase();
    setFilteredCourses(
      courses.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          (c.instructorName && c.instructorName.toLowerCase().includes(term)) ||
          (c.category && c.category.toLowerCase().includes(term))
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2>Courses</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by title, instructor or category..."
        onChange={handleFilter}
      />

      <ul className="list-group">
        {filteredCourses.map((course) => (
          <li key={course.id} className="list-group-item">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
