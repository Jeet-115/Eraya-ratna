import { useState, useEffect } from "react";
import { createEvent, getAllEvents, updateEvent, deleteEvent } from "../../services/eventService";
import { toast } from "react-hot-toast";

const AdminEvents = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    image: null,
  });
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res);
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      if (editId) {
        await updateEvent(editId, formData);
        toast.success("Event updated");
      } else {
        await createEvent(formData);
        toast.success("Event created");
      }
      setForm({ title: "", description: "", location: "", startTime: "", endTime: "", image: null });
      setEditId(null);
      fetchEvents();
    } catch (err) {
      toast.error("Error saving event");
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      startTime: event.startTime.slice(0, 16),
      endTime: event.endTime.slice(0, 16),
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this event?")) {
      try {
        await deleteEvent(id);
        toast.success("Event deleted");
        fetchEvents();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} required />
        <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Update" : "Add"} Event</button>
      </form>

      <div className="mt-10 space-y-4">
        {events.map(event => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>🕒 {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
            <img src={event.image} alt={event.title} className="w-32 mt-2" />
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(event)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
