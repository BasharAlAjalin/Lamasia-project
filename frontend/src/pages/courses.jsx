import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses").then((res) => {
      setCourses(res.data);
      setFilteredCourses(res.data);
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

  const viewCourseContent = (course) => {
    setSelectedCourse(course);
    axios
      .get(`http://localhost:8080/api/courses/${course.id}/content`)
      .then((res) => {
        setCourseContent(res.data);
      })
      .catch(() => {
        setCourseContent([]);
      });
  };

  const backToCourses = () => {
    setSelectedCourse(null);
    setCourseContent([]);
  };

  if (selectedCourse) {
    return (
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={backToCourses}>
          ← Back to Courses
        </button>
        <h2>{selectedCourse.title}</h2>
        <p>{selectedCourse.description}</p>

        <h3 className="mt-4">Course Content:</h3>
        <ul className="list-group">
          {courseContent.map((item) => (
            <li key={item.id} className="list-group-item">
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
          <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{course.title}</span>
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => viewCourseContent(course)}
            >
              View Content
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
