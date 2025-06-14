import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getAllProducts } from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);

        // Fetch all products to find similar ones by tags:
        const allProducts = await getAllProducts();
        const similar = allProducts.filter(p =>
          p._id !== id && p.tags.some(tag => fetchedProduct.tags.includes(tag))
        );
        setSimilarProducts(similar);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full max-w-md h-auto object-cover rounded-lg shadow"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl text-pink-600 font-bold">₹{product.price}</p>
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {similarProducts.length > 0 ? similarProducts.map((sp) => (
            <div
              key={sp._id}
              className="min-w-[200px] bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={sp.images[0]}
                alt={sp.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-md font-semibold mb-1">{sp.name}</h3>
              <p className="text-pink-600 font-bold mb-2">₹{sp.price}</p>
              <div className="flex gap-2">
                <button className="flex-1 text-sm bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300">
                  Cart
                </button>
                <button className="flex-1 text-sm bg-pink-600 text-white py-1 rounded hover:bg-pink-700">
                  Buy
                </button>
              </div>
            </div>
          )) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
