import { useEffect, useState } from "react";
import API from "../api/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
