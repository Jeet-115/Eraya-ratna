import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  toggleCategoryStatus,
} from "../../services/categoryService";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      <form onSubmit={handleAddCategory} className="mb-8 bg-white p-4 rounded shadow max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          name="name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />
        <textarea
          placeholder="Category Description (optional)"
          name="description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Category
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow overflow-x-auto max-w-4xl">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const isEditing = editingId === cat._id;
              return (
                <tr key={cat._id} className="hover:bg-gray-50 border-t">
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      value={isEditing ? formState.name : cat.name}
                      onChange={handleFormChange}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 rounded ${
                        isEditing ? "border border-gray-300 bg-white" : "bg-transparent border-none"
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
                        isEditing ? "border border-gray-300 bg-white" : "bg-transparent border-none"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-2 text-xl text-center">
                    <button onClick={() => handleToggleStatus(cat._id)} className="focus:outline-none">
                      {cat.isActive ? (
                        <MdToggleOn className="text-green-500" />
                      ) : (
                        <MdToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
