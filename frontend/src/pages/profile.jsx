import useAuth from "../auth/useAuth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}
