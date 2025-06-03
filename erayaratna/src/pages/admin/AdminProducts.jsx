import { useState } from "react";

const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Necklaces");

  const categories = ["Necklaces", "Rings", "Bracelets"];
  const dummyProducts = [
    {
      title: "Gold Necklace",
      price: "₹5000",
      tags: ["gold", "wedding"],
    },
    {
      title: "Diamond Ring",
      price: "₹8000",
      tags: ["diamond", "engagement"],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Select Category */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Add Product Form */}
      <form className="bg-white p-4 rounded shadow mb-8 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Title"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Price (₹)"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="file"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {/* Product List Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Products in {selectedCategory}</h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Tags</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyProducts.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{p.title}</td>
                <td className="px-4 py-2 border-b">{p.price}</td>
                <td className="px-4 py-2 border-b">{p.tags.join(", ")}</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-blue-600 mr-4 hover:underline">
                    Edit
                  </button>
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

export default AdminProducts;
