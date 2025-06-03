import Navbar from "../component/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10 px-4 md:px-10">
        {/* Intro Section */}
        <section className="w-full px-6 py-10 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Eraya RATNA</h1>
            <p className="text-lg text-gray-700">
              {/* Replace this with content from your friend */}
              Discover authentic handcrafted jewelry, uniquely made with love
              and tradition.
            </p>
          </div>
        </section>

        {/* Products Overview */}
        <section className="w-full px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Products Overview</h2>
              <button className="text-pink-600 hover:underline">
                View All Products
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <h3 className="text-lg font-bold mb-2">Product Title</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Short description...
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="bg-pink-600 text-white text-sm px-3 py-1 rounded hover:bg-pink-700">
                      Add to Cart
                    </button>
                    <button className="text-pink-600 text-sm hover:underline">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="w-full px-6 py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>

            {/* Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3].map((event) => (
                <div
                  key={event}
                  className="min-w-[250px] bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <h3 className="text-lg font-bold mb-2">Event Title</h3>
                  <p className="text-sm text-gray-600">Date: June 20, 2025</p>
                  <p className="text-sm text-gray-600">
                    Location: Jaipur, India
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
