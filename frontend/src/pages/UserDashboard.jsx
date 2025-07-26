import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:8080/api/results/user/${user.id}`).then((res) => {
        setGrades(res.data);
      });
    }
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Welcome, {user?.username} 🙌
      </h2>
      <h3>Your Results:</h3>
      <ul className="list-disc pl-5">
        {grades.map((g) => (
          <li key={g.quizId}>
            Quiz: {g.quizTitle} – Score: {g.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
