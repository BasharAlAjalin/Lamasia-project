import React, { useState } from "react";
import axios from "axios";

const CourseContentUpload = ({ courseId }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("PDF");
  const [url, setUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const contentData = {
        title,
        type,
        url,
        course: { id: courseId },
      };

      await axios.post(
        "http://localhost:8080/api/course-contents",
        contentData
      );
      alert("Content uploaded successfully!");
      setTitle("");
      setType("PDF");
      setUrl("");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload content");
    }
  };

  return (
    <div className="card p-3 my-3">
      <h5>Upload Course Content</h5>
      <form onSubmit={handleUpload}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="File URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default CourseContentUpload;
