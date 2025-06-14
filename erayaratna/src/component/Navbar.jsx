import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { logoutUser } from "../services/authService";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#FFD59F] to-[#FFB39F] text-[#4B2E2E] shadow-md z-50 px-4 py-3"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer w-28 h-auto"
        >
          <img
            src="./Logo.png"
            alt="Eraya RATNA Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={toggleLanguage}
            className="border px-2 py-1 rounded hover:bg-gray-100 transition"
          >
            {language === "en" ? "EN" : "हिं"}
          </button>

          {user ? (
            <div className="flex flex-col items-center text-center space-y-1">
              <span
                className="font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/profile")}
              >
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-xs text-gray-700 hover:underline"
              >
                {t("Logout")}
              </button>
            </div>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="cursor-pointer hover:text-[#B05050]"
            >
              {t("Login")}
            </div>
          )}

          <div
            onClick={() => navigate("/orders")}
            className="cursor-pointer hover:text-[#B05050]"
          >
            {t("Order History")}
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-[#B05050]">
            <MdOutlineLocationOn className="text-xl" />
            <div onClick={() => navigate("/address")}>
              <p className="text-xs text-gray-500">{t("Deliver to")}</p>
              <p className="text-sm font-semibold">{t("Your Address")}</p>
            </div>
            <FaChevronDown className="text-xs" />
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer hover:text-[#B05050]"
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-[#FF7F7F] text-white text-xs px-1.5 rounded-full">
              0
            </span>
          </div>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              className="w-8 h-[3px] bg-[#4B2E2E] rounded-md"
            />
            <motion.div
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-8 h-[3px] bg-[#4B2E2E] rounded-md my-[5px]"
            />
            <motion.div
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              className="w-8 h-[3px] bg-[#4B2E2E] rounded-md"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-[#FFD59F] to-[#FFB39F] shadow-md rounded-b-lg text-center py-4 space-y-4"
          >
            <button
              onClick={toggleLanguage}
              className="border px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              {language === "en" ? "EN" : "हिं"}
            </button>

            {user ? (
              <div className="flex flex-col items-center space-y-2">
                <span
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:underline"
                >
                  {t("Logout")}
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer hover:text-[#B05050]"
              >
                {t("Login")}
              </div>
            )}

            <div
              onClick={() => {
                navigate("/orders");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer hover:text-[#B05050]"
            >
              {t("Order History")}
            </div>

            <div
              onClick={() => {
                navigate("/address");
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 hover:text-[#B05050]"
            >
              <MdOutlineLocationOn className="text-xl" />
              <div>
                <p className="text-xs text-gray-500">{t("Deliver to")}</p>
                <p className="text-sm font-semibold">{t("Your Address")}</p>
              </div>
              <FaChevronDown className="text-xs" />
            </div>

            <div
              onClick={() => {
                navigate("/cart");
                setIsMenuOpen(false);
              }}
              className="relative cursor-pointer hover:text-[#B05050] mx-auto"
            >
              <FaShoppingCart className="text-xl mx-auto" />
              <span className="absolute -top-2 right-[45%] bg-[#FF7F7F] text-white text-xs px-1.5 rounded-full">
                0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
