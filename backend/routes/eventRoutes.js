import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  toggleEventStatus,
  getAllEventsAdmin,
} from '../controllers/eventController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js'; // single image upload

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin routes
router.post('/', protect, adminOnly, upload.single('image'), createEvent);
router.put('/:id', protect, adminOnly, upload.single('image'), updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);
router.put('/:id/toggle', protect, adminOnly, toggleEventStatus);
router.get('/admin/all', protect, adminOnly, getAllEventsAdmin);


export default router;
