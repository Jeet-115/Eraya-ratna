// src/services/adminService.js
import axiosInstance from '../utils/axiosInstance';

export const fetchDashboardSummary = async () => {
  const res = await axiosInstance.get('/api/admin/dashboard');
  return res.data;
};

export const fetchRevenueStats = async () => {
  const res = await axiosInstance.get('/api/admin/stats/revenue');
  return res.data;
};

export const fetchTopProducts = async () => {
  const res = await axiosInstance.get('/api/admin/stats/top-products');
  return res.data;
};
