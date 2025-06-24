import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/cartService";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Failed to add to cart.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
        setSelectedCategory(res[0]?._id || ""); // select first category by default
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        try {
          const res = await getProducts({ category: selectedCategory });
          setProducts(res);
        } catch (err) {
          console.error("Failed to fetch products", err);
        }
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-white shadow-md hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`cursor-pointer hover:text-pink-600 transition font-medium ${
                selectedCategory === cat._id ? "text-pink-600 font-bold" : ""
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Grid */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-pink-600 font-bold mb-3">₹{product.price}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex-1 bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300 transition"
                >
                  Add to Cart
                </button>
                <button className="flex-1 bg-pink-600 text-white py-1 rounded hover:bg-pink-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Products;
