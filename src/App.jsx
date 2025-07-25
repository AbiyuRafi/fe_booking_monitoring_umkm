import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UmkmDashboard from "./pages/UmkmDashboard";
import KonsultanDashboard from "./pages/KonsultanDashboard";
import BookingList from "./pages/booking/IndexBooking";
import BookingCreate from "./pages/booking/CreateBooking";
import ScheduleCreate from "./pages/schedule/CreateSchedule";
import ScheduleList from "./pages/schedule/IndexSchedule";
import Unauthorized from "./pages/Unauthorized";
import BookingListKonsultan from "./pages/booking_konsultan/IndexBookingKonsultan";
import ManagementUser from "./pages/users/IndexUsers";
import BookingAdmin from "./pages/booking_admin/IndexBookingAdmin";
import RoleProtectedRoute from "./middleware/RoleProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Layout><AdminDashboard /></Layout>
            </RoleProtectedRoute>
          }
        />

        {/* UMKM Routes */}
        <Route
          path="/dashboard/umkm"
          element={
            <RoleProtectedRoute allowedRoles={["umkm"]}>
              <Layout><UmkmDashboard /></Layout>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/index/booking"
          element={
            <RoleProtectedRoute allowedRoles={["umkm"]}>
              <Layout><BookingList /></Layout>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/booking/schedule/:id"
          element={
            <RoleProtectedRoute allowedRoles={["umkm"]}>
              <Layout><BookingCreate /></Layout>
            </RoleProtectedRoute>
          }
        />

        {/* Konsultan Routes */}
        <Route
          path="/dashboard/konsultan"
          element={
            <RoleProtectedRoute allowedRoles={["konsultan"]}>
              <Layout><KonsultanDashboard /></Layout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/index/booking/konsultan"
          element={
            <RoleProtectedRoute allowedRoles={["konsultan"]}>
              <Layout><BookingListKonsultan /></Layout>
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/index/schedule"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Layout><ScheduleList /></Layout>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/create/schedule"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Layout><ScheduleCreate /></Layout>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/index/users"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Layout><ManagementUser /></Layout>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/index/booking/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Layout><BookingAdmin /></Layout>
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
