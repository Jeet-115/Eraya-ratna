import { useState } from "react";

const HomepageProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Necklaces");
  const [topProducts, setTopProducts] = useState([]);

  const categories = ["Necklaces", "Rings", "Bracelets"];
  const dummyProducts = [
    { id: 1, title: "Gold Necklace" },
    { id: 2, title: "Silver Necklace" },
    { id: 3, title: "Ruby Necklace" },
    { id: 4, title: "Diamond Necklace" },
  ];

  const toggleTopProduct = (id) => {
    setTopProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Homepage Top Products</h1>

      {/* Category Selector */}
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

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
        {dummyProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => toggleTopProduct(p.id)}
            className={`p-4 border rounded cursor-pointer shadow hover:shadow-lg transition ${
              topProducts.includes(p.id)
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">Click to {topProducts.includes(p.id) ? "remove" : "select"} as homepage product</p>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={topProducts.length === 0}
      >
        Save Selection
      </button>
    </div>
  );
};

export default HomepageProducts;
