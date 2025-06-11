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
    <div>
      <h1 className="text-2xl font-bold mb-6">Homepage Top Products</h1>
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => toggleTopProduct(p._id)}
            className={`p-4 border rounded cursor-pointer shadow hover:shadow-lg transition ${
              topProducts.includes(p._id)
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">
              Click to {topProducts.includes(p._id) ? "remove" : "select"} as homepage product
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={saveSelection}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={false}
      >
        Save Selection
      </button>
    </div>
  );
};

export default HomepageProducts;
