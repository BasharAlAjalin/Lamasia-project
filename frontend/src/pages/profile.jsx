import React from "react";
import { useAuth } from "../auth/authContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-3">Profile</h1>
      {user ? (
        <p className="lead">Welcome, {user.username}!</p>
      ) : (
        <p className="text-danger">Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default Profile;
