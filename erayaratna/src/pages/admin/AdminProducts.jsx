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
    } catch (err) {
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
    const init = async () => {
      await fetchCategories();
      await fetchProducts();
    };
    init();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
    payload.append("tags", JSON.stringify(tagsArray));
    payload.append("category", formData.category);
    if (formData.images) {
      for (let file of formData.images) {
        payload.append("images", file);
      }
    }

    try {
      const product = await addProduct(payload);
      toast.success("Product added");
      await fetchProducts();
      setProducts([product, ...products]);
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Add failed");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
    payload.append("tags", JSON.stringify(tagsArray));
    payload.append("category", formData.category);
    if (formData.images) {
      for (let file of formData.images) {
        payload.append("images", file);
      }
    }

    try {
      const updated = await updateProduct(editingProduct._id, payload);
      toast.success("Product updated");
      const updatedWithCategory = {
        ...updated,
        category:
          categories.find((c) => c._id === updated.category) ||
          updated.category,
      };
      setProducts(
        products.map((p) => (p._id === updated._id ? updatedWithCategory : p))
      );

      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      tags: product.tags?.join(", ") || "",
      images: null,
      category:
        typeof product.category === "object"
          ? product.category._id
          : product.category || "",
    });

    const categoryId =
      typeof product.category === "object"
        ? product.category._id
        : product.category;

    const categoryName = categories.find((c) => c._id === categoryId)?.name;

    if (categoryName) {
      setSelectedCategory(categoryName);
    }

    if (product.images && product.images.length > 0) {
      setImagePreviews(product.images); // Assuming these are URLs
    } else {
      setImagePreviews([]);
    }
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
    if (typeof p.category === "object" && p.category?.name) {
      return p.category.name === selectedCategory;
    }
    const cat = categories.find((c) => c._id === p.category);
    return cat?.name === selectedCategory;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Select Category */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            const selectedName = e.target.value;
            setSelectedCategory(selectedName);
            const selectedCat = categories.find(
              (cat) => cat.name === selectedName
            );
            if (selectedCat) {
              setFormData((prev) => ({
                ...prev,
                category: selectedCat._id,
              }));
            }
          }}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add/Update Product Form */}
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="bg-white p-4 rounded shadow mb-8 max-w-2xl"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingProduct ? "Update Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleFormChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleFormChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="text"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleFormChange}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="file"
            name="images"
            multiple
            onChange={handleFormChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {imagePreviews.length > 0 && (
            <div className="col-span-2 flex gap-4 flex-wrap">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleFormChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">
          Products in {selectedCategory}
        </h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Tags</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{p.name}</td>
                <td className="px-4 py-2 border-b">₹{p.price}</td>
                <td className="px-4 py-2 border-b">{p.tags?.join(", ")}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="text-blue-600 mr-4 hover:underline"
                    onClick={() => handleEditClick(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
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
