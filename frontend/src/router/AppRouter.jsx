import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";

import Businesses from "../pages/businesses/Businesses";
import BusinessDetail from "../pages/businesses/BusinessDetail";
import CreateBusiness from "../pages/businesses/CreateBusiness";
import EditBusiness from "../pages/businesses/EditBusiness";
import MyBusiness from "../pages/businesses/MyBusiness";

import Categories from "../pages/categories/Categories";
import Sectors from "../pages/sectors/Sectors";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/profile/Profile";

import AdminBusinesses from "../pages/admin/AdminBusinesses";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminSectors from "../pages/admin/AdminSectors";
import AdminReports from "../pages/admin/AdminReports";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/businesses" element={<Businesses />} />
        <Route path="/businesses/create" element={<CreateBusiness />} />
        <Route path="/businesses/:slug/edit" element={<EditBusiness />} />
        <Route path="/businesses/:slug" element={<BusinessDetail />} />

        <Route path="/my-business" element={<MyBusiness />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/admin/businesses"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminBusinesses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sectors"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminSectors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
