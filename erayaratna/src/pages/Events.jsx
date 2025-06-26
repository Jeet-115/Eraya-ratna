import { useState, useEffect } from "react";
import { getEventsForHome } from "../services/eventService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../component/Footer";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEventsForHome();
        setEvents(data);
      } catch (error) {
        toast.error("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleProtectedAction = (action) => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      action();
    }
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#FFF6F0] to-[#EAE2F3] text-[#4B2E2E] outfit">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-[#4B2E2E] hover:text-[#8A2C02] hover:underline cursor-pointer transition w-fit"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaArrowLeft className="text-lg" />
          <span className="text-sm font-medium tracking-wide">
            Back to Home
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌿 All Events
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading events...
          </motion.p>
        ) : events.length === 0 ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No events found 🕊️
          </motion.p>
        ) : (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event) => {
              const status = getStatus(event.startTime, event.endTime);

              return (
                <motion.div
                  key={event._id}
                  className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow border-l-4"
                  style={{
                    borderColor:
                      status === "Upcoming"
                        ? "#3b82f6"
                        : status === "Ongoing"
                        ? "#10b981"
                        : "#9ca3af",
                  }}
                  variants={cardVariants}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
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

                  <p className="text-gray-700 leading-relaxed mb-3">
                    {event.description}
                  </p>

                  <div className="text-sm text-gray-600">
                    📍 <span className="font-medium">{event.location}</span>
                    <br />
                    🗓️ {new Date(event.startTime).toLocaleDateString()} –{" "}
                    {new Date(event.endTime).toLocaleDateString()}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Footer Spiritual Quote */}
      <Footer
        navigate={navigate}
        handleProtectedAction={handleProtectedAction}
        quote="“Attend not just to events, but to the energy they bring.” ✨"
      />
    </section>
  );
};

export default Events;
