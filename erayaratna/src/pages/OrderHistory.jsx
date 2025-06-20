import { useState, useEffect } from "react";
import { getMyOrders } from "../services/orderService";
import { toast } from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load your orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-1">Delivered To:</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                  {order.shippingInfo.state}
                </p>
              </div>

              <ul className="text-sm text-gray-700 mb-3">
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>₹{item.product.price}</span>
                  </li>
                ))}
              </ul>

              <div className="text-right font-bold text-lg text-pink-600">
                Total: ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
