const Payment = () => {
  return (
    <section className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      {/* Address Selection */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Select Delivery Address</h3>
        <div className="space-y-4">
          <label className="block border rounded p-4">
            <input type="radio" name="address" className="mr-2" defaultChecked />
            Home Address - Delhi, India (Default)
          </label>
          <label className="block border rounded p-4">
            <input type="radio" name="address" className="mr-2" />
            Office Address - Mumbai, India
          </label>
        </div>
      </div>

      {/* Delivery ETA */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-2">Estimated Delivery</h3>
        <p className="text-gray-700">Delivery between <strong>2 days</strong> and <strong>1 week</strong>.</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="mb-4">
          <li className="flex justify-between py-2">
            <span>Product A (x2)</span>
            <span>₹800</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Product B (x1)</span>
            <span>₹500</span>
          </li>
        </ul>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹1300</span>
        </div>
      </div>

      {/* Razorpay Payment Button */}
      <div className="text-center">
        <button
          className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700"
          disabled
        >
          Pay with Razorpay (Static for now)
        </button>
      </div>
    </section>
  );
};

export default Payment;
