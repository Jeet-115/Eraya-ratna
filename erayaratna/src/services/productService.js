// /services/productService.js
import axiosInstance from '../utils/axiosInstance';

// Get all products (admin context)
export const getAllProducts = async () => {
  const res = await axiosInstance.get('/api/products');
  return res.data;
};

// Create a new product (with image upload)
export const addProduct = async (formData) => {
  const res = await axiosInstance.post('/api/admin/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// Update an existing product
export const updateProduct = async (id, formData) => {
  const res = await axiosInstance.put(`/api/admin/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// Delete a product (soft delete)
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/api/admin/products/${id}`);
  return res.data;
};

// Bulk soft delete (optional)
export const bulkDeleteProducts = async (ids) => {
  const res = await axiosInstance.put('/api/admin/products/bulk-delete', { ids });
  return res.data;
};
