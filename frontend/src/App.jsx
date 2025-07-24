import React from "react";
import { useAuth } from "./auth/useAuth";

const App = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to LMS Project</h1>
      {user ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              login({ name: "Demo User", email: "demo@example.com" })
            }
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default App;
