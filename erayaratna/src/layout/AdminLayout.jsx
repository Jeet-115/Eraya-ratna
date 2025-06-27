import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Cookies from 'js-cookie';
import { logoutUser } from '../services/authService';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaUsers, FaThLarge, FaBoxOpen, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/admin/admindashboard', icon: <FaThLarge /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaBoxOpen /> },
    { name: 'Products', path: '/admin/products', icon: <FaBoxOpen /> },
    { name: 'Top Products', path: '/admin/top-products', icon: <FaStar /> },
    { name: 'Events', path: '/admin/events', icon: <FaCalendarAlt /> },
    { name: 'Newsletter', path: '/admin/newsletter', icon: <FaBoxOpen /> },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove('token');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f0f4f8] via-[#fdfcff] to-[#f3f9f7]">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-indigo-800 text-white shadow">
        <h2 className="text-xl font-bold">🌟 Admin Panel</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="md:hidden bg-indigo-700 text-white p-4 space-y-3 shadow"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-white text-indigo-700 shadow-inner'
                    : 'hover:bg-indigo-600'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
            >
              <FiLogOut /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-gradient-to-br from-indigo-800 to-purple-700 text-white p-6 flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-10 tracking-tight text-center">
            🌟 Admin Panel
          </h2>
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === link.path
                    ? 'bg-white text-indigo-700 shadow-inner'
                    : 'hover:bg-indigo-600'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
