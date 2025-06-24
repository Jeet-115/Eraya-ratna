import axiosInstance from '../utils/axiosInstance';

export const getCart = async () => {
  const res = await axiosInstance.get('/api/cart');
  return res.data;
};

export const updateCartItem = async (itemId, data) => {
  const res = await axiosInstance.put(`/api/cart/${itemId}`, data);
  return res.data;
};

export const removeFromCart = async (itemId) => {
  const res = await axiosInstance.delete(`/api/cart/${itemId}`);
  return res.data;
};
