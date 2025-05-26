import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  bulkSoftDeleteProducts,
} from '../controllers/productController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts); // list products with optional filters
router.get('/featured', getFeaturedProducts); // homepage featured products
router.get('/:id', getProductById); // get product details

// Admin routes
router.post('/', protect, adminOnly, upload.array('images', 5) , createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 5) , updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.put('/bulk-delete', protect, adminOnly, bulkSoftDeleteProducts);


export default router;
