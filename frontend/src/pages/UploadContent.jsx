import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

function UploadContent() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    type: "PDF",
    url: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/contents/upload", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Content uploaded successfully!");
      navigate("/courses");
    } catch (error) {
      alert("Upload failed. Make sure you're logged in as an INSTRUCTOR.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Course Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Course</label>
          <select
            name="courseId"
            className="form-select"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Content Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content Type</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="PDF">PDF</option>
            <option value="VIDEO">Video (YouTube)</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Content URL (PDF link or YouTube URL)
          </label>
          <input
            type="text"
            name="url"
            className="form-control"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadContent;
