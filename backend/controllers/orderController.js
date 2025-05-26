import Order from '../models/Order.js';

// @desc Create a new order
export const createOrder = async (req, res) => {
  const { orderItems, shippingInfo, totalAmount, paymentInfo } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items provided' });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingInfo,
      totalAmount,
      paymentInfo,
      isPaid: paymentInfo?.status === 'paid',
      paidAt: paymentInfo?.status === 'paid' ? Date.now() : null,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// @desc Get orders for logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// @desc Get single order by ID (admin + user owner)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Only allow user to access their own order (unless admin)
    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// @desc Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
};

// @desc Mark order as delivered (admin)
export const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({ message: 'Order marked as delivered', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};
