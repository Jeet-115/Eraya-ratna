const orders = [
  {
    id: "ORD12345",
    date: "2025-05-20",
    total: "₹4,500",
    status: "Delivered",
    address: "123 Temple Road, Mumbai, Maharashtra",
    items: [
      { name: "Gold Ring", qty: 1, price: "₹2,500" },
      { name: "Silver Earrings", qty: 1, price: "₹2,000" },
    ],
  },
  {
    id: "ORD12346",
    date: "2025-05-24",
    total: "₹2,800",
    status: "Pending",
    address: "456 Heritage Lane, Pune, Maharashtra",
    items: [{ name: "Antique Bracelet", qty: 1, price: "₹2,800" }],
  },
];

const OrderHistory = () => {
  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-600">Date: {order.date}</p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-1">Delivered To:</p>
              <p className="text-sm font-medium text-gray-900">{order.address}</p>
            </div>

            <ul className="text-sm text-gray-700 mb-3">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name} × {item.qty}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="text-right font-bold text-lg text-pink-600">
              Total: {order.total}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;
