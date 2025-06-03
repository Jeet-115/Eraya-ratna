const categories = ["Rings", "Necklaces", "Bracelets", "Earrings"];

const dummyProducts = [
  {
    id: 1,
    title: "Elegant Gold Ring",
    image: "https://via.placeholder.com/150",
    price: "₹2,500",
  },
  {
    id: 2,
    title: "Silver Necklace Set",
    image: "https://via.placeholder.com/150",
    price: "₹3,200",
  },
  {
    id: 3,
    title: "Diamond Bracelet",
    image: "https://via.placeholder.com/150",
    price: "₹4,500",
  },
  {
    id: 4,
    title: "Traditional Earrings",
    image: "https://via.placeholder.com/150",
    price: "₹1,800",
  },
];

const Products = () => {
  return (
    <section className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-white shadow-md hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-pink-600 transition font-medium"
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products Grid */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-3">{product.price}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300 transition">
                  Add to Cart
                </button>
                <button className="flex-1 bg-pink-600 text-white py-1 rounded hover:bg-pink-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Products;
