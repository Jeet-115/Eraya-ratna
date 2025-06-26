const Footer = ({ navigate, handleProtectedAction, quote }) => (
  <footer className="mt-16 px-4 py-10 bg-gradient-to-br from-[#FFEBDA] to-[#FFF5EF] text-[#5C3A00] text-center rounded-t-3xl shadow-inner">
    <p className="text-xl font-semibold mb-3 italic">
      {quote || "“Handcrafted with energy, intention & purpose.” ✨"}
    </p>

    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 text-sm">
      <button onClick={() => navigate("/")} className="hover:underline cursor-pointer">Home</button>
      <button onClick={() => handleProtectedAction(() => navigate("/products"))} className="hover:underline cursor-pointer">Products</button>
      <button onClick={() => navigate("/events")} className="hover:underline cursor-pointer">Events</button>
    </div>

    <p className="mt-6 text-sm">
      For inquiries, blessings or support:{" "}
      <a href="mailto:erayaratna@gmail.com" className="text-pink-600 hover:underline">
        erayaratna@gmail.com
      </a>
    </p>

    <p className="mt-4 text-xs text-[#7A4B2C]">
      Designed & Developed by{" "}
      <a
        href="https://jeetmistry.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 font-semibold hover:underline"
      >
        Jeet Mistry
      </a>
    </p>

    <p className="mt-2 text-xs text-[#96724E]">
      © {new Date().getFullYear()} Eraya RATNA. All rights reserved.
    </p>
  </footer>
);

export default Footer;
