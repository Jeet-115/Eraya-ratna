import { useState } from "react";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      {/* Add New Category Form */}
      <form className="mb-8 bg-white p-4 rounded shadow max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>

      {/* Existing Categories Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto max-w-2xl">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Category Name</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {["Necklaces", "Rings", "Bracelets"].map((name, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{name}</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
