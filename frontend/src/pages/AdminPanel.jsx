import React, { useState, useEffect } from "react";
import { fetchAllUsers, updateUserRole, deleteUser } from "../api/api";
import { useAuth } from "../auth/authContext";

function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await fetchAllUsers();
      setUsers(userData);
      setError("");
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setSuccessMessage(`User role updated to ${newRole}`);
      setEditingUser(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update user role");
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        setSuccessMessage("User deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "INSTRUCTOR":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "USER":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">Welcome, {user?.name}! Manage users and their roles.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
            {successMessage}
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-semibold text-white">User Management</h2>
            <p className="text-gray-300 mt-1">Manage user roles and permissions</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Current Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((userData) => (
                  <tr key={userData.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {userData.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-white font-medium">{userData.name}</div>
                          <div className="text-gray-400 text-sm">ID: {userData.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {userData.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(userData.role)}`}>
                        {userData.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-3">
                        {editingUser === userData.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              className="bg-slate-800 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                              defaultValue={userData.role}
                              onChange={(e) => handleRoleChange(userData.id, e.target.value)}
                            >
                              <option value="USER">User</option>
                              <option value="INSTRUCTOR">Instructor</option>
                              <option value="ADMIN">Admin</option>
                            </select>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingUser(userData.id)}
                              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                              Edit Role
                            </button>
                            {userData.id !== user?.id && (
                              <button
                                onClick={() => handleDeleteUser(userData.id)}
                                className="text-red-400 hover:text-red-300 transition-colors font-medium"
                              >
                                Delete
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No users found.
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-400">{users.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Instructors</h3>
            <p className="text-3xl font-bold text-blue-400">
              {users.filter(u => u.role === "INSTRUCTOR").length}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Students</h3>
            <p className="text-3xl font-bold text-green-400">
              {users.filter(u => u.role === "USER").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
