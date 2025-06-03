const events = [
  {
    id: 1,
    title: "Handicraft Workshop",
    description: "Learn traditional techniques with experts.",
    location: "Delhi Haat",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
  },
  {
    id: 2,
    title: "Summer Art Exhibition",
    description: "A display of Eraya's best handcrafted pieces.",
    location: "Mumbai Art Gallery",
    startDate: "2025-05-26",
    endDate: "2025-05-28",
  },
  {
    id: 3,
    title: "Winter Fest Showcase",
    description: "Join us this December for exclusive collections.",
    location: "Bangalore Palace",
    startDate: "2025-12-10",
    endDate: "2025-12-12",
  },
];

const getStatus = (start, end) => {
  const today = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (today < startDate) return "Upcoming";
  if (today > endDate) return "Completed";
  return "Ongoing";
};

const Events = () => {
  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6">All Events</h2>

      <div className="space-y-6">
        {events.map((event) => {
          const status = getStatus(event.startDate, event.endDate);

          return (
            <div
              key={event.id}
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
                📍 {event.location} | 🗓️ {event.startDate} - {event.endDate}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Events;
