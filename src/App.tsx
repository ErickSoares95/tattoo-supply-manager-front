import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { RequireAuth } from './auth/RequireAuth';
import { RequireAdmin } from './auth/RequireAdmin';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminUserFormPage from './pages/admin/AdminUserFormPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/account/password" element={<ChangePasswordPage />} />

            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/new" element={<AdminProductFormPage />} />
              <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/users/:id/edit" element={<AdminUserFormPage />} />
              <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
