import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  markAsDelivered,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Authenticated user
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Admin
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/deliver', protect, adminOnly, markAsDelivered);

export default router;
