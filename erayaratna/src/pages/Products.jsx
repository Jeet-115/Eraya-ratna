import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../component/Footer";
import { motion } from "framer-motion";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        setSelectedCategory(res[0]?._id || "");
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF6F0] to-[#F1EDF8] text-[#4B2E2E] outfit">
      <div className="max-w-7xl mx-auto flex px-4 py-10 gap-6">
        {/* Sidebar */}
        <motion.aside
          className="w-1/4 hidden md:block"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">🧿 Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition font-medium ${
                  selectedCategory === cat._id
                    ? "bg-[#FFEFE8] text-[#8A2C02] font-bold shadow"
                    : "hover:bg-white/70 hover:shadow"
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Back to Home */}
          <motion.div
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-[#4B2E2E] hover:text-[#8A2C02] hover:underline cursor-pointer transition w-fit"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <FaArrowLeft className="text-lg" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            🛍️ Our Divine Collection
          </motion.h2>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white/90 p-4 rounded-2xl shadow-md backdrop-blur-lg hover:shadow-xl transition"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
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
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      <Footer
        navigate={navigate}
        handleProtectedAction={() => {}}
        quote="“In every item lies a little joy and a lot of peace.” 🌸"
      />
    </section>
  );
};

export default Products;
