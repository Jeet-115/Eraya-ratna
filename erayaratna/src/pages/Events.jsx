import { useState, useEffect } from "react";
import { getEventsForHome } from "../services/eventService";
import { toast } from "react-hot-toast";

const getStatus = (start, end) => {
  const today = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (today < startDate) return "Upcoming";
  if (today > endDate) return "Completed";
  return "Ongoing";
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEventsForHome(); // API call
        setEvents(data);
      } catch (error) {
        toast.error("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6">All Events</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            const status = getStatus(event.startTime, event.endTime);

            return (
              <div
                key={event._id}
                className="bg-white p-6 rounded-xl shadow border-l-4"
                style={{
                  borderColor:
                    status === "Upcoming"
                      ? "#3b82f6"
                      : status === "Ongoing"
                      ? "#10b981"
                      : "#9ca3af",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      status === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : status === "Ongoing"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <p className="text-gray-700">{event.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  📍 {event.location} | 🗓️{" "}
                  {new Date(event.startTime).toLocaleDateString()} -{" "}
                  {new Date(event.endTime).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Events;
