import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";

const Navbar = () => {
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "हिं" : "EN"));
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        Eraya <span className="text-pink-600">RATNA</span>
      </div>

      {/* Right Side Options */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="border px-2 py-1 rounded hover:bg-gray-100 transition"
        >
          {language}
        </button>

        {/* Login/User */}
        <div className="cursor-pointer hover:text-pink-600">Login</div>

        {/* Order History */}
        <div className="cursor-pointer hover:text-pink-600">Order History</div>

        {/* Address (Amazon style) */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-pink-600">
          <MdOutlineLocationOn className="text-xl" />
          <div>
            <p className="text-xs text-gray-500">Deliver to</p>
            <p className="text-sm font-semibold">Your Address</p>
          </div>
          <FaChevronDown className="text-xs" />
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer hover:text-pink-600">
          <FaShoppingCart className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 rounded-full">
            0
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
