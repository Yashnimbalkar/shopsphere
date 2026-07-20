import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import MyOrders from "../pages/MyOrders";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import TrackOrder from "../pages/TrackOrder";

import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductForm from "../pages/admin/AdminProductForm";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminCoupons from "../pages/admin/AdminCoupons";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import AdminUsers from "../pages/admin/AdminUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "track-order", element: <TrackOrder /> },
      {
        path: "my-orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-confirmation/:orderId",
        element: (
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <AdminProductForm /> },
      { path: "products/:id/edit", element: <AdminProductForm /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "coupons", element: <AdminCoupons /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <AdminOrderDetail /> },
      { path: "users", element: <AdminUsers /> },
    ],
  },
]);

export default router;