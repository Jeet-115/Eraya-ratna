// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  fetchDashboardSummary,
  fetchRevenueStats,
  fetchTopProducts,
} from '../../services/adminService';

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

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summary && Object.entries(summary).map(([key, value]) => (
          <div key={key} className="bg-white p-4 shadow rounded">
            <h2 className="text-sm text-gray-500 capitalize">{key}</h2>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Stats */}
      <div className="bg-white p-6 shadow rounded space-y-2">
        <h2 className="text-lg font-bold">Revenue</h2>
        <p><strong>Total Revenue:</strong> ₹{revenue?.totalRevenue.toFixed(2)}</p>
        <p><strong>Avg Order Value:</strong> ₹{revenue?.avgOrderValue.toFixed(2)}</p>
        <div>
          <h3 className="font-semibold mb-2">Revenue by Month:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(revenue?.revenueByMonth || {}).map(([month, value]) => (
              <li key={month}>{month}: ₹{value.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Top Products</h2>
        <ul className="space-y-2">
          {topProducts.map((product, index) => (
            <li key={index} className="flex items-center space-x-4">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
              )}
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">Sold: {product.qtySold} | Price: ₹{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
