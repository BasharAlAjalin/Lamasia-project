import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function LogIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: "user@example.com" });
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2 className="mb-4">Login</h2>
      <button onClick={handleLogin} className="btn btn-primary">
        Log In
      </button>
    </div>
  );
}
