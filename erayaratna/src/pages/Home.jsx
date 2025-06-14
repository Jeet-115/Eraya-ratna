import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar";
import { getFeaturedProducts } from "../services/productService";
import LoginPromptModal from "../component/LoginPromptModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    handleProtectedAction(() => navigate(`/product/${productId}`));
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await getFeaturedProducts();
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeatured();
  }, []);

  const handleProtectedAction = (action) => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      action();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <Navbar />
      <div className="mt-16 px-4 md:px-10 outfit text-[#4B2E2E]">
        {/* Intro Section */}
        <motion.section
          className="w-full px-6 py-12 bg-gradient-to-r from-[#FFD59F] to-[#FFB39F] rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold mb-4 drop-shadow-md">Welcome to Eraya RATNA</h1>
            <p className="text-lg text-gray-700">
              Discover authentic handcrafted jewelry, uniquely made with love and tradition.
            </p>
          </div>
        </motion.section>

        {/* Products Overview */}
        <section className="w-full px-6 py-12 bg-gradient-to-br from-pink-50 via-white to-pink-100 rounded-2xl mt-10 shadow-inner">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-pink-600 drop-shadow-sm">
                Featured Products
              </h2>
              <button
                onClick={() =>
                  handleProtectedAction(() => (window.location.href = "/products"))
                }
                className="text-white bg-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-700 transition duration-300 text-sm"
              >
                View All Products
              </button>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    onClick={() => handleCardClick(product._id)}
                    className="bg-white/60 backdrop-blur-lg border border-pink-100 p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    variants={itemVariants}
                  >
                    <div className="h-44 bg-gradient-to-tr from-pink-100 to-pink-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain transform hover:scale-105 transition duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center text-pink-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 text-center">
                      {product.description?.slice(0, 60)}...
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProtectedAction(() =>
                            console.log("Add to cart logic here")
                          );
                        }}
                        className="bg-pink-600 text-white text-xs px-4 py-2 rounded-full hover:bg-pink-700 shadow-md transition"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProtectedAction(() =>
                            console.log("Buy now logic here")
                          );
                        }}
                        className="text-pink-600 text-xs font-medium hover:underline transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  No featured products available.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <motion.section
          className="w-full px-6 py-12 bg-gradient-to-r from-[#FFB39F] to-[#FFD59F] rounded-2xl shadow-xl mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#4B2E2E]">
              Upcoming Events
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3].map((event) => (
                <motion.div
                  key={event}
                  className="min-w-[250px] bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <h3 className="text-lg font-bold mb-2 text-center text-pink-600">
                    Event Title
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Date: June 20, 2025
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Location: Jaipur, India
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
        )}
      </div>
    </>
  );
};

export default Home;
