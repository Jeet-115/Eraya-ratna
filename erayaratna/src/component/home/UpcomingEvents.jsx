import { motion } from "framer-motion";

const UpcomingEvents = ({ events, navigate }) => (
  <motion.section
    className="w-full px-6 py-14 bg-gradient-to-br from-[#FFB39F] to-[#FFD59F] rounded-2xl shadow-2xl mt-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
  >
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-[#5D3A00] tracking-wide drop-shadow">
          Events
        </h2>
        <button
          onClick={() => navigate("/events")}
          className="bg-gradient-to-r from-[#FF9770] to-[#FF6F61] text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-medium"
        >
          View All Events
        </button>
      </motion.div>

      {/* Events Scroll Area */}
      <motion.div
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <motion.div
              key={event._id}
              className="min-w-[260px] bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-32 bg-gradient-to-tr from-[#FFEFE8] to-[#FFF6F0] rounded-xl mb-4 overflow-hidden flex items-center justify-center shadow-inner">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-[#8A2C02]">
                {event.title}
              </h3>
              <p className="text-sm text-[#6C3D00] text-center mb-1">
                📅 {new Date(event.startTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-[#6C3D00] text-center">
                📍 {event.location}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 w-full italic">
            No upcoming events.
          </p>
        )}
      </motion.div>
    </div>

    {/* Quote */}
    <motion.div
      className="mt-10 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="text-lg text-[#5C3A00] italic font-medium">
        “Align your energies, embrace the divine, and let your inner light
        shine.” ✨
      </p>
    </motion.div>
  </motion.section>
);

export default UpcomingEvents;
