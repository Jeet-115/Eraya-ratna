import { useState } from "react";

const AdminEvents = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const dummyEvents = [
    {
      id: 1,
      title: "Gold Jewelry Exhibition",
      description: "Showcasing our latest gold designs.",
      location: "Delhi, India",
      startDate: "2025-07-01T10:00",
      endDate: "2025-07-01T18:00",
    },
    {
      id: 2,
      title: "Craft Workshop",
      description: "Learn to design traditional jewelry.",
      location: "Mumbai, India",
      startDate: "2025-08-05T11:00",
      endDate: "2025-08-05T16:00",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      {/* Existing Events List */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {dummyEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded p-4 shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm">📍 {event.location}</p>
              <p className="text-sm">
                🕒 {new Date(event.startDate).toLocaleString()} →{" "}
                {new Date(event.endDate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Event Form */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
        <form className="grid gap-4 max-w-xl">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <div className="flex gap-4">
            <input
              type="datetime-local"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="datetime-local"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEvents;
