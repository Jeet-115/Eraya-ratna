const Profile = () => {
  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      {/* Username Change Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Update Username</h3>
        <form className="space-y-4">
          <input
            type="text"
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
        <form className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
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
