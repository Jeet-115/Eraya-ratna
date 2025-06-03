const product = {
  id: 1,
  title: "Elegant Gold Ring",
  image: "https://via.placeholder.com/300",
  description: "This is a beautiful handcrafted gold ring, perfect for weddings and special occasions.",
  price: "₹2,500",
};

const similarProducts = [
  {
    id: 2,
    title: "Diamond Gold Ring",
    image: "https://via.placeholder.com/150",
    price: "₹3,000",
  },
  {
    id: 3,
    title: "Antique Ring",
    image: "https://via.placeholder.com/150",
    price: "₹2,800",
  },
  {
    id: 4,
    title: "Ruby Stone Ring",
    image: "https://via.placeholder.com/150",
    price: "₹3,200",
  },
];

const ProductDetails = () => {
  return (
    <section className="p-6 min-h-screen bg-gray-50">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md h-auto object-cover rounded-lg shadow"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl text-pink-600 font-bold">{product.price}</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
              Add to Cart
            </button>
            <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {similarProducts.map((sp) => (
            <div
              key={sp.id}
              className="min-w-[200px] bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={sp.image}
                alt={sp.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-md font-semibold mb-1">{sp.title}</h3>
              <p className="text-pink-600 font-bold mb-2">{sp.price}</p>
              <div className="flex gap-2">
                <button className="flex-1 text-sm bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300">
                  Cart
                </button>
                <button className="flex-1 text-sm bg-pink-600 text-white py-1 rounded hover:bg-pink-700">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
