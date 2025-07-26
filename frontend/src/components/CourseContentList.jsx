import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseContentList = ({ courseId }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/course-contents/course/${courseId}`
        );
        setContents(response.data);
      } catch (error) {
        console.error("Error loading contents:", error);
      }
    };

    fetchContents();
  }, [courseId]);

  return (
    <div className="card p-3 my-3">
      <h5>Course Materials</h5>
      <ul className="list-group">
        {contents.map((content) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={content.id}
          >
            {content.title} ({content.type})
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-success"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseContentList;
