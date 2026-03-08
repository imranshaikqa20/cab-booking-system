import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRides();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const fetchRides = async () => {
    const res = await API.get("/admin/rides");
    setRides(res.data);
  };

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  const suspendUser = async (id) => {
    await API.put(`/admin/suspend/${id}`);
    fetchUsers();
  };

  const activateUser = async (id) => {
    await API.put(`/admin/activate/${id}`);
    fetchUsers();
  };

  const formatCurrency = (value) => {
    if (!value) return "₹0.00";

    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* ===== STATS ===== */}

      {stats && (

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white border p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>

          <div className="bg-white border p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Drivers</p>
            <p className="text-3xl font-bold mt-2">{stats.totalDrivers}</p>
          </div>

          <div className="bg-white border p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Rides</p>
            <p className="text-3xl font-bold mt-2">{stats.totalRides}</p>
          </div>

          <div className="bg-white border p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">
              ₹{formatCurrency(stats.totalRevenue)}
            </p>
          </div>

        </div>

      )}

      {/* ===== USERS ===== */}

      <h2 className="text-2xl font-semibold mb-6">
        Users
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">

        {users.map(user => (

          <div
            key={user.id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <div className="flex justify-between items-center mb-3">

              <h3 className="font-semibold text-lg">
                {user.name}
              </h3>

              <span className="text-sm px-3 py-1 border rounded-full">
                {user.role}
              </span>

            </div>

            <p className="text-sm text-gray-600 mb-4">
              Status:
              <span className="ml-2 font-medium text-black">
                {user.status}
              </span>
            </p>

            {user.status === "ACTIVE" ? (

              <button
                onClick={() => suspendUser(user.id)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Suspend
              </button>

            ) : (

              <button
                onClick={() => activateUser(user.id)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                Activate
              </button>

            )}

          </div>

        ))}

      </div>

      {/* ===== RIDES ===== */}

      <h2 className="text-2xl font-semibold mb-6">
        All Rides
      </h2>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">

            <tr>
              <th className="text-left p-4 text-sm font-semibold">Pickup</th>
              <th className="text-left p-4 text-sm font-semibold">Drop</th>
              <th className="text-left p-4 text-sm font-semibold">Status</th>
              <th className="text-left p-4 text-sm font-semibold">Fare</th>
            </tr>

          </thead>

          <tbody>

            {rides.map(ride => (

              <tr
                key={ride.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  {ride.pickupLocation}
                </td>

                <td className="p-4">
                  {ride.dropLocation}
                </td>

                <td className="p-4">
                  <span className="text-sm px-3 py-1 border rounded-full">
                    {ride.status}
                  </span>
                </td>

                <td className="p-4 font-semibold">
                  ₹{formatCurrency(ride.fare)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default AdminDashboard;