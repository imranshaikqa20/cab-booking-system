import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";


// ================= GET TOKEN =================

function getToken() {
  return localStorage.getItem("token");
}


// ================= GET ROLE FROM TOKEN =================

function getUserRole() {

  const token = getToken();

  if (!token) return null;

  try {

    const decoded = jwtDecode(token);

    return decoded?.role || null;

  } catch {

    return null;

  }
}


// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children, role }) {

  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ================= PUBLIC ROUTE =================

function PublicRoute({ children }) {

  const token = getToken();

  if (token) {

    const role = getUserRole();

    if (role === "ADMIN") return <Navigate to="/admin-dashboard" replace />;

    if (role === "DRIVER") return <Navigate to="/driver-dashboard" replace />;

    if (role === "RIDER") return <Navigate to="/rider-dashboard" replace />;
  }

  return children;
}


// ================= APP =================

function App() {

  const role = getUserRole();

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME PAGE (FIRST PAGE) */}
        <Route path="/" element={<Home />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* RIDER DASHBOARD */}
        <Route
          path="/rider-dashboard"
          element={
            <ProtectedRoute role="RIDER">
              <RiderDashboard />
            </ProtectedRoute>
          }
        />

        {/* DRIVER DASHBOARD */}
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute role="DRIVER">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD SHORTCUT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {role === "ADMIN" && <Navigate to="/admin-dashboard" replace />}
              {role === "DRIVER" && <Navigate to="/driver-dashboard" replace />}
              {role === "RIDER" && <Navigate to="/rider-dashboard" replace />}
            </ProtectedRoute>
          }
        />

        {/* UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;