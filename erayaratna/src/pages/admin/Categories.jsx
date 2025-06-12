import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  toggleCategoryStatus,
} from "../../services/categoryService";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15 },
  }),
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({ name: "", description: "" });

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const data = await addCategory(newCategory);
      setCategories([data, ...categories]);
      setNewCategory({ name: "", description: "" });
      toast.success("Category added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const data = await toggleCategoryStatus(id);
      setCategories(
        categories.map((c) =>
          c._id === id ? { ...c, isActive: data.isActive } : c
        )
      );
      toast.success("Status updated");
    } catch {
      toast.error("Toggle failed");
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setFormState({ name: cat.name, description: cat.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormState({ name: "", description: "" });
  };

  const saveEdit = async (id) => {
    try {
      const data = await updateCategory(id, formState);
      setCategories(categories.map((c) => (c._id === id ? data : c)));
      cancelEdit();
      toast.success("Category updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Category Management
      </motion.h1>

      {/* Add Category Form */}
      <motion.form
        onSubmit={handleAddCategory}
        className="bg-white p-6 rounded-xl shadow-md max-w-md space-y-4 border border-gray-100"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <h2 className="text-xl font-semibold text-gray-700">Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          name="name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
        />
        <textarea
          placeholder="Category Description (optional)"
          name="description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Add Category
        </button>
      </motion.form>

      {/* Category Table */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-md overflow-x-auto max-w-5xl border border-gray-100"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b text-center">Status</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => {
              const isEditing = editingId === cat._id;
              return (
                <motion.tr
                  key={cat._id}
                  className="hover:bg-gray-50 border-t"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      value={isEditing ? formState.name : cat.name}
                      onChange={handleFormChange}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 rounded ${
                        isEditing
                          ? "border border-gray-300 bg-white focus:ring focus:ring-blue-200 outline-none"
                          : "bg-transparent border-none"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <textarea
                      name="description"
                      value={isEditing ? formState.description : cat.description}
                      onChange={handleFormChange}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 rounded ${
                        isEditing
                          ? "border border-gray-300 bg-white focus:ring focus:ring-blue-200 outline-none"
                          : "bg-transparent border-none"
                      }`}
                    />
                  </td>
                  {/* Modern Switch Toggle */}
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleToggleStatus(cat._id)}
                      className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition"
                    >
                      <span
                        className={`${
                          cat.isActive ? 'bg-green-500' : 'bg-gray-300'
                        } absolute h-6 w-11 rounded-full transition-colors`}
                      ></span>
                      <span
                        className={`${
                          cat.isActive ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                      ></span>
                    </button>
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    {isEditing ? (
                      <>
                        <button onClick={() => saveEdit(cat._id)} className="text-green-600 hover:text-green-800">
                          💾
                        </button>
                        <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-800">
                          ✖️
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(cat)} className="text-blue-600 hover:text-blue-800">
                          <FaRegEdit size={18} />
                        </button>
                        <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:text-red-800">
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Categories;
