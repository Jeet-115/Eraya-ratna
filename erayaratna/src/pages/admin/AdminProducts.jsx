import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../services/productService";
import { toast } from "react-hot-toast";

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
    images: null,
    category: "",
  });

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].name);
        setFormData((prev) => ({ ...prev, category: data[0]._id }));
      }
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchProducts();
    })();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    }
    setFormData((prev) => ({ ...prev, [name]: files ? files : value }));
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "tags") {
        payload.append(key, JSON.stringify(val.split(",").map(tag => tag.trim())));
      } else if (key === "images" && val) {
        Array.from(val).forEach(file => payload.append("images", file));
      } else {
        payload.append(key, val);
      }
    });

    try {
      const action = editingProduct
        ? updateProduct(editingProduct._id, payload)
        : addProduct(payload);
      const result = await action;

      toast.success(editingProduct ? "Product updated" : "Product added");

      const updatedWithCat = {
        ...result,
        category: categories.find(c => c._id === result.category) || result.category
      };

      setProducts(prev => editingProduct
        ? prev.map(p => (p._id === result._id ? updatedWithCat : p))
        : [result, ...prev]);

      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Confirm delete?")) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags.join(", "),
      images: null,
      category: typeof product.category === "object" ? product.category._id : product.category,
    });

    setSelectedCategory(
      categories.find(c => c._id === (typeof product.category === "object" ? product.category._id : product.category))?.name
    );

    setImagePreviews(product.images || []);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      tags: "",
      images: null,
      category: formData.category,
    });
    setImagePreviews([]);
  };

  const filteredProducts = products.filter((p) => {
    const categoryObj = typeof p.category === "object" ? p.category : categories.find(c => c._id === p.category);
    return categoryObj?.name === selectedCategory;
  });

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-semibold">Product Management</h1>

      <div className="bg-white p-4 shadow rounded flex flex-col gap-4 max-w-md">
        <label className="font-medium">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            const name = e.target.value;
            setSelectedCategory(name);
            const cat = categories.find(c => c.name === name);
            if (cat) setFormData((prev) => ({ ...prev, category: cat._id }));
          }}
          className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <form
        onSubmit={handleAddOrUpdateProduct}
        className="bg-white p-6 rounded shadow space-y-4 max-w-3xl"
      >
        <h2 className="text-xl font-semibold">
          {editingProduct ? "Update Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleFormChange}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleFormChange}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleFormChange}
            className="border px-3 py-2 rounded col-span-1 md:col-span-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleFormChange}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFormChange}
            className="border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-700"
          />
        </div>

        {imagePreviews.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="preview"
                className="w-24 h-24 object-contain rounded shadow"
              />
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-4 rounded shadow max-w-5xl overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Products in {selectedCategory}</h2>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.tags.join(", ")}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No products in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
