import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Signup</h2>
      <input
        name="name"
        className="border p-2 w-full"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        className="border p-2 w-full"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        className="border p-2 w-full"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <select
        name="role"
        className="border p-2 w-full"
        onChange={handleChange}
        value={form.role}
      >
        <option value="STUDENT">Student</option>
        <option value="INSTRUCTOR">Instructor</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Signup
      </button>
    </form>
  );
}
