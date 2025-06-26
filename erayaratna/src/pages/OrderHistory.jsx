import { useState, useEffect } from "react";
import { getMyOrders } from "../services/orderService";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { motion } from "framer-motion";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load your orders");
      }
    };

    fetchOrders();
  }, []);

  const handleProtectedAction = (action) => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      action();
    }
  };

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#FFF7EA] to-[#FFE0D3] outfit text-[#4B2E2E] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-[#4B2E2E] hover:text-[#8A2C02] hover:underline cursor-pointer transition w-fit"
        >
          <FaArrowLeft className="text-lg" />
          <span className="text-sm font-medium tracking-wide">Back to Home</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          📦 Your Orders
        </motion.h2>

        {orders.length === 0 ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You have no orders yet.
          </motion.p>
        ) : (
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {orders.map((order) => (
              <motion.div
                key={order._id}
                className="bg-white/70 backdrop-blur-lg border border-[#FFD59F] p-6 rounded-3xl shadow-xl transition hover:shadow-2xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      🧾 Order ID: {order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      📅 {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-4 py-1 rounded-full ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>

                {/* Address */}
                <div className="mb-3 text-sm">
                  <p className="text-gray-600">Delivered To:</p>
                  <p className="font-medium text-gray-800">
                    {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                    {order.shippingInfo.state}
                  </p>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-[#FFD59F]/50">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 text-sm"
                    >
                      <span className="text-gray-700">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-[#B05050]">
                        ₹{item.product.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold text-lg text-pink-600 mt-4">
                  Total: ₹{order.totalAmount}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer
        navigate={navigate}
        handleProtectedAction={handleProtectedAction}
        quote="“Every product you choose adds beauty to your spirit.” 🌼"
      />
    </section>
  );
};

export default OrderHistory;
