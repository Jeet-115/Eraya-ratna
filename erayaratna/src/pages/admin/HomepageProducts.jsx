import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllProducts, updateFeaturedProducts } from "../../services/productService";
import { toast } from "react-hot-toast";

const HomepageProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      setCategories(res);
      setSelectedCategory(res[0]?._id || "");
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        const res = await getAllProducts({ category: selectedCategory });
        setProducts(res);
        const featured = res.filter(p => p.isFeaturedOnHome).map(p => p._id);
        setTopProducts(featured);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const toggleTopProduct = (id) => {
    setTopProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const saveSelection = async () => {
    try {
      await updateFeaturedProducts({ categoryId: selectedCategory, productIds: topProducts });
      toast.success("Top products updated!");
    } catch (error) {
      toast.error("Failed to update featured products.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Homepage Top Products</h1>

      <div className="flex items-center gap-4">
        <label className="font-medium text-lg">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => toggleTopProduct(p._id)}
            className={`p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 border-2 ${
              topProducts.includes(p._id)
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{p.name}</h3>
            <p className="text-sm text-gray-500">
              {topProducts.includes(p._id) ? "Selected for Homepage" : "Click to select"}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={saveSelection}
        className="block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 mx-auto mt-8"
        disabled={false}
      >
        Save Selection
      </button>
    </div>
  );
};

export default HomepageProducts;
