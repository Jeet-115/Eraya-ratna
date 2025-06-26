import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import Cookies from 'js-cookie';
import { logoutUser } from '../services/authService';
import { FiLogOut } from 'react-icons/fi';
import { FaUsers, FaThLarge, FaBoxOpen, FaStar, FaCalendarAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { name: 'Dashboard', path: '/admin/admindashboard', icon: <FaThLarge /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaBoxOpen /> },
    { name: 'Products', path: '/admin/products', icon: <FaBoxOpen /> },
    { name: 'Top Products', path: '/admin/top-products', icon: <FaStar /> },
    { name: 'Events', path: '/admin/events', icon: <FaCalendarAlt /> },
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
    <div className="min-h-screen flex bg-gradient-to-br from-[#f0f4f8] via-[#fdfcff] to-[#f3f9f7]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-800 to-purple-700 text-white p-6 shadow-lg flex flex-col justify-between">
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
                    : 'hover:bg-indigo-600 hover:shadow-md'
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
          className="mt-10 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition font-semibold"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
