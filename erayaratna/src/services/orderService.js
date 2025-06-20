import axiosInstance from '../utils/axiosInstance';

// Get orders for logged-in user
export const getMyOrders = async () => {
  const res = await axiosInstance.get('/api/orders/my');
  return res.data;
};

// (Optional: For single order detail if needed)
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/api/orders/${id}`);
  return res.data;
};
