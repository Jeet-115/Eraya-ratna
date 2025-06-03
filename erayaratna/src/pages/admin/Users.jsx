const Users = () => {
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
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">John Doe {i}</td>
                <td className="px-4 py-2 border-b">john{i}@example.com</td>
                <td className="px-4 py-2 border-b">user</td>
                <td className="px-4 py-2 border-b">2025-05-01</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
