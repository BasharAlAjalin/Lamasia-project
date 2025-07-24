import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    login({ username: "newuser@example.com" });
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <button onClick={handleSignUp} className="btn btn-success">
        Sign Up
      </button>
    </div>
  );
}
