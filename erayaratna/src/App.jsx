// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails.jsx";
import OrderHistory from "./pages/OrderHistory";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Events from "./pages/Events";
import AdminLayout from "./layout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/Users";
import AdminCategories from "./pages/admin/Categories";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminHomepageProducts from "./pages/admin/HomepageProducts.jsx";
import AdminEvents from "./pages/admin/AdminEvents";
import ProtectedRoute from "./protection/ProtectedRoute";
import AdminRoute from "./protection/AdminRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* User Routes with Navbar */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="events" element={<Events />} />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="address"
              element={
                <ProtectedRoute>
                  <Address />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="/admin/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route
              path="/admin/top-products"
              element={<AdminHomepageProducts />}
            />
            <Route path="/admin/events" element={<AdminEvents />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
