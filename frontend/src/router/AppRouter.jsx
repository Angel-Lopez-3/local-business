import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Businesses from "../pages/businesses/Businesses";
import Categories from "../pages/categories/Categories";
import Sectors from "../pages/sectors/Sectors";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateBusiness from "../pages/businesses/CreateBusiness";
import MyBusiness from "../pages/businesses/MyBusiness";


export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/businesses"
          element={<Businesses />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/businesses/create"
          element={<CreateBusiness />}
        />

        <Route
          path="/my-business"
          element={<MyBusiness />}
        />
        
        <Route
          path="/sectors"
          element={<Sectors />}
        />
      </Route>
    </Routes>
  );
}