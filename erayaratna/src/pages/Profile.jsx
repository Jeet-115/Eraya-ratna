import { useState } from 'react';
import { updateUserProfile } from '../services/userService';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ name });
      toast.success("Username updated successfully!");
      setName('');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update name");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await updateUserProfile({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      {/* Username Change Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Update Username</h3>
        <form onSubmit={handleUpdateName} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New Username"
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            Update Username
          </button>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
