import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { courseId } = useParams(); // يأخذ ID الدورة من الرابط
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // جلب بيانات الدورة
    axios.get(`http://localhost:8080/api/courses/${courseId}`).then((res) => {
      setCourse(res.data);
    });

    // جلب محتوى الدورة
    axios
      .get(`http://localhost:8080/api/courses/${courseId}/content`)
      .then((res) => {
        setContent(res.data);
      });
  }, [courseId]);

  if (!course) return <p>Loading course details...</p>;

  return (
    <div className="container mt-4">
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <h3 className="mt-4">Course Content:</h3>
      <ul className="list-group">
        {content.map((item) => (
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
