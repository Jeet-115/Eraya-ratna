import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Top Products', path: '/admin/top-products' },
    { name: 'Events', path: '/admin/events' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                location.pathname === link.path ? 'bg-gray-700' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
