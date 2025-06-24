import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router;
