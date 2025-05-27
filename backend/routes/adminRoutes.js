import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardSummary,
  getRevenueStats,
  getTopProducts,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly); // Apply auth + admin check to all routes

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/dashboard', getDashboardSummary);
router.get('/stats/revenue', getRevenueStats);
router.get('/stats/top-products', getTopProducts);

export default router;
