import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser as deleteUserAPI,
  updateUser as updateUserAPI,
} from "../../services/userService";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    setFormState({ name: user.name, email: user.email, role: user.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormState({ name: "", email: "", role: "user" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const updated = await updateUserAPI(id, {
        name: formState.name,
        email: formState.email,
        isAdmin: formState.role === "admin",
      });

      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));

      toast.success("User updated");
      cancelEdit();
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserAPI(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isEditing = editingId === u._id;
                return (
                  <tr
                    key={u._id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <input
                        name="name"
                        value={isEditing ? formState.name : u.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-2 py-1 rounded-md ${
                          isEditing
                            ? "border border-gray-300 bg-white"
                            : "border-none bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        name="email"
                        value={isEditing ? formState.email : u.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-2 py-1 rounded-md ${
                          isEditing
                            ? "border border-gray-300 bg-white"
                            : "border-none bg-transparent"
                        }`}
                      />
                    </td>
                    <td className="p-3">
                      <select
                        name="role"
                        value={isEditing ? formState.role : u.role}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-2 py-1 rounded-md ${
                          isEditing
                            ? "border border-gray-300 bg-white cursor-pointer"
                            : "border-none bg-transparent"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3 flex justify-center gap-3 text-lg">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(u._id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            💾
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-500 hover:text-gray-800"
                          >
                            ✖️
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(u)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaRegEdit size={18} />
                          </button>
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
