const savedAddresses = [
  {
    id: "1",
    name: "Home",
    address: "123 MG Road, Bengaluru, KA - 560001",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    address: "456 IT Park, Hyderabad, TS - 500081",
    phone: "9123456780",
    isDefault: false,
  },
];

const Address = () => {
  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Delivery Addresses</h2>

      <div className="space-y-4">
        {savedAddresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 rounded-xl shadow-md border ${
              addr.isDefault ? "border-pink-600" : "border-gray-200"
            } bg-white`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{addr.name}</h3>
                <p className="text-gray-600">{addr.address}</p>
                <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
              </div>
              <div className="text-right">
                {addr.isDefault ? (
                  <span className="text-sm text-pink-600 font-semibold">
                    Default
                  </span>
                ) : (
                  <button className="text-sm text-blue-600 hover:underline">
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
            <input
              type="text"
              placeholder="Address Label (e.g. Home, Office)"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Full Address"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 md:col-span-2"
            >
              Add Address
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Address;
