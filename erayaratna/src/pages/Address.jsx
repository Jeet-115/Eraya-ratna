import { useState, useEffect } from "react";
import {
  getUserAddresses,
  addUserAddress,
  setDefaultAddress,
  deleteUserAddress,
} from "../services/addressService";
import { toast } from "react-hot-toast";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const [loading, setLoading] = useState(false);

  // Fetch addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getUserAddresses();
        setAddresses(res);
      } catch (error) {
        toast.error("Failed to load addresses.");
      }
    };
    fetchAddresses();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addUserAddress(form); // Don't expect the returned value to use directly
      const updated = await getUserAddresses(); // Re-fetch addresses properly
      setAddresses(updated); // Now has fresh addresses with proper _id
      setForm({
        fullName: "",
        mobileNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });
      toast.success("Address added!");
    } catch (error) {
      toast.error("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  // Set default address
  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      const updated = addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === id,
      }));
      setAddresses(updated);
      toast.success("Default address updated!");
    } catch (error) {
      toast.error("Failed to update default address.");
    }
  };

  // Delete address (Optional)
  const handleDelete = async (id) => {
    try {
      await deleteUserAddress(id);
      setAddresses(addresses.filter((addr) => addr._id !== id));
      toast.success("Address removed!");
    } catch (error) {
      toast.error("Failed to remove address.");
    }
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Delivery Addresses</h2>

      <div className="space-y-4">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 rounded-xl shadow-md border ${
                addr.isDefault ? "border-pink-600" : "border-gray-200"
              } bg-white`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{addr.fullName}</h3>
                  <p className="text-gray-600">
                    {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                    , {addr.country}
                  </p>
                  <p className="text-sm text-gray-500">
                    Phone: {addr.mobileNumber}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  {addr.isDefault ? (
                    <span className="text-sm text-pink-600 font-semibold">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-sm text-red-600 hover:underline block"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
          <form
            onSubmit={handleAddAddress}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow"
          >
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded px-3 py-2"
              required
            />
            <label className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
              />
              <span>Set as default</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 md:col-span-2"
            >
              {loading ? "Adding..." : "Add Address"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Address;
