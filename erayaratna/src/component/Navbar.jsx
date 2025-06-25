import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { logoutUser } from "../services/authService";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { getCart } from "../services/cartService";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await getCart();
        setCartCount(
          res.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
        );
      } catch (error) {
        console.error("Failed to load cart count:", error);
      }
    };
    if (user) {
      // only if user logged in
      fetchCartCount();
    }
  }, [user]);

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
      className="w-full bg-gradient-to-r from-[#FFD59F] to-[#FFB39F] text-[#4B2E2E] shadow-md z-50 px-4 py-3"
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
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              {/* User Dropdown */}
              <div className="relative group">
                <span className="font-semibold cursor-pointer hover:underline">
                  {user.name}
                </span>

                {/* Dropdown on hover */}
                <div className="absolute top-full right-0 mt-2 w-48 backdrop-blur-2xl rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={toggleLanguage}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {language === "en"
                      ? "Switch to हिंदी"
                      : "Switch to English"}
                  </button>

                  <div
                    onClick={() => navigate("/orders")}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {t("Order History")}
                  </div>

                  <div
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {t("Profile")}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    {t("Logout")}
                  </button>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#B05050]">
                <MdOutlineLocationOn className="text-xl" />
                <div onClick={() => navigate("/address")}>
                  <p className="text-xs text-gray-500">{t("Deliver to")}</p>
                  <p className="text-sm font-semibold">{t("Your Address")}</p>
                </div>
              </div>

              {/* Cart */}
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer hover:text-[#B05050]"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF7F7F] text-white text-xs px-1.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="cursor-pointer hover:text-[#B05050]"
            >
              {t("Login")}
            </div>
          )}
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
            className="md:hidden w-full rounded-b-lg text-start px-6 py-5 space-y-4 z-50"
          >
            {user ? (
              <>
                {/* User Name */}
                <div className="text-lg font-semibold text-[#4B2E2E]">
                  {user.name}
                </div>

                {/* Profile */}
                <div
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#B05050]"
                >
                  <span className="material-icons text-base">profile</span>
                </div>

                {/* Order History */}
                <div
                  onClick={() => {
                    navigate("/orders");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#B05050]"
                >
                  <span className="material-icons text-base">
                    Order History
                  </span>
                </div>

                {/* Delivery Address */}
                <div
                  onClick={() => {
                    navigate("/address");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#B05050]"
                >
                  <MdOutlineLocationOn className="text-lg" />
                  <span>{t("Your Address")}</span>
                </div>

                {/* Cart */}
                <div
                  onClick={() => {
                    navigate("/cart");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm cursor-pointer relative hover:text-[#B05050]"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>{t("Cart")}</span>
                  {cartCount > 0 && (
                    <span className="absolute left-2 -top-2 bg-[#FF7F7F] text-white text-xs px-1.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>

                {/* Language Switcher */}
                <button
                  onClick={toggleLanguage}
                  className="w-fit text-sm border px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  {language === "en" ? "Switch to हिंदी" : "Switch to English"}
                </button>

                {/* Logout */}
                <div className="mt-[-10px]">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-red-600 hover:underline mt-2"
                  >
                    {t("Logout")}
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="text-sm cursor-pointer hover:text-[#B05050]"
              >
                {t("Login")}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
