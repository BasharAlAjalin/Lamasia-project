import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authentication";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    login(res.data.user, res.data.token);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        className="border p-2 w-full"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="border p-2 w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
