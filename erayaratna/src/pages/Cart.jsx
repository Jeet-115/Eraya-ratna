import { useState, useEffect } from "react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from backend
  useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      console.log("Fetched cart response:", res); // DEBUG
      setCartItems(res.cart || []); // adjust 'cart' to match actual key
    } catch (error) {
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };
  fetchCart();
}, []);


  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem(itemId, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success("Item removed from cart!");
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(({ _id, product, quantity }) => (
            <div
              key={_id}
              className="flex items-center bg-white p-4 rounded-xl shadow-sm"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">₹{product.price}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => handleQuantityChange(_id, quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(_id, quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(_id)}
                    className="ml-4 text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right text-pink-600 font-semibold w-24">
                ₹{product.price * quantity}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl shadow-sm">
            <span className="font-semibold text-lg">Total:</span>
            <span className="text-pink-600 text-lg font-bold">
              ₹{getTotal()}
            </span>
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
