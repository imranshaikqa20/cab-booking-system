import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded?.role || null;
    } catch {
      role = null;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="font-bold text-lg">
        Cab Booking
      </h1>

      <div className="space-x-4">

        <Link to="/">Home</Link>

        {/* Not Logged In */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* Rider */}
        {token && role === "RIDER" && (
          <Link to="/rider-dashboard">Dashboard</Link>
        )}

        {/* Driver */}
        {token && role === "DRIVER" && (
          <Link to="/driver-dashboard">Dashboard</Link>
        )}

        {/* Admin */}
        {token && role === "ADMIN" && (
          <Link to="/admin-dashboard">Admin Panel</Link>
        )}

        {/* Logout */}
        {token && (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;