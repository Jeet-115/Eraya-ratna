import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  fetchDashboardSummary,
  fetchRevenueStats,
  fetchTopProducts,
} from '../../services/adminService';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2 },
  }),
};

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryData, revenueData, topProductsData] = await Promise.all([
          fetchDashboardSummary(),
          fetchRevenueStats(),
          fetchTopProducts(),
        ]);
        setSummary(summaryData);
        setRevenue(revenueData);
        setTopProducts(topProductsData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <div className="text-center py-10 text-lg font-medium">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summary &&
          Object.entries(summary).map(([key, value], index) => (
            <motion.div
              key={key}
              className="bg-white p-4 shadow-md rounded-xl border border-gray-100 hover:shadow-lg cursor-pointer transition"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <h2 className="text-sm text-gray-500 capitalize">{key}</h2>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </motion.div>
          ))}
      </div>

      {/* Revenue Stats */}
      <motion.div
        className="bg-white p-6 shadow-md rounded-xl border border-gray-100"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Overview</h2>
        <p className="text-gray-600 mb-1"><strong>Total Revenue:</strong> ₹{revenue?.totalRevenue.toFixed(2)}</p>
        <p className="text-gray-600 mb-3"><strong>Avg Order Value:</strong> ₹{revenue?.avgOrderValue.toFixed(2)}</p>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Revenue by Month:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {Object.entries(revenue?.revenueByMonth || {}).map(([month, value]) => (
              <li key={month}>{month}: ₹{value.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Top Products */}
      <motion.div
        className="bg-white p-6 shadow-md rounded-xl border border-gray-100"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Selling Products</h2>
        <ul className="space-y-4">
          {topProducts.map((product, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-md border"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Sold: {product.qtySold} | Price: ₹{product.price}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
