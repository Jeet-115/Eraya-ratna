const cartItems = [
  {
    id: "1",
    name: "Gold Pendant",
    price: 2500,
    quantity: 1,
    image:
      "https://via.placeholder.com/100x100?text=Pendant",
  },
  {
    id: "2",
    name: "Silver Ring",
    price: 1800,
    quantity: 2,
    image:
      "https://via.placeholder.com/100x100?text=Ring",
  },
];

const Cart = () => {
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    +
                  </button>
                  <button className="ml-4 text-red-600 text-sm hover:underline">
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right text-pink-600 font-semibold w-24">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl shadow-sm">
            <span className="font-semibold text-lg">Total:</span>
            <span className="text-pink-600 text-lg font-bold">₹{getTotal()}</span>
          </div>

          <div className="text-right mt-4">
            <button className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
