import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  getAllCategoriesAdmin,
} from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Public
router.get('/', getCategories);

// Admin only
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);
router.put('/:id/toggle', protect, adminOnly, toggleCategoryStatus);
router.get('/admin/all', protect, adminOnly, getAllCategoriesAdmin);


export default router;
