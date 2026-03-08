import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

function DriverDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [availableRides, setAvailableRides] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});

  useEffect(() => {

    initializeDashboard();

    const interval = setInterval(() => {
      fetchDriverRides();
      fetchReviews();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const initializeDashboard = async () => {

    try {

      const userRes = await API.get("/user/me");

      if (userRes.data.role !== "DRIVER") {
        navigate("/rider-dashboard");
        return;
      }

      setUser(userRes.data);

      await fetchAvailableRides();
      await fetchDriverRides();
      await fetchReviews(userRes.data.id);

    } catch {

      localStorage.removeItem("token");
      navigate("/login");

    }

    setLoading(false);
  };

  const fetchAvailableRides = async () => {

    try {

      const res = await API.get("/rides/available");
      setAvailableRides(res.data || []);

    } catch {

      setAvailableRides([]);

    }
  };

  const fetchDriverRides = async () => {

    try {

      const res = await API.get("/rides/driver-rides");

      const rides = res.data || [];

      setMyRides(rides);

      const currentRide = rides.find(
        ride =>
          ride.status === "ACCEPTED" ||
          ride.status === "IN_PROGRESS" ||
          ride.status === "PAYMENT_PENDING"
      );

      setActiveRide(currentRide || null);

    } catch {

      setMyRides([]);

    }
  };

  const fetchReviews = async (driverId = user?.id) => {

    if (!driverId) return;

    try {

      const res = await API.get(`/reviews/driver/${driverId}`);
      setReviews(res.data || []);

    } catch {

      setReviews([]);

    }
  };

  const acceptRide = async (rideId) => {
    await API.put(`/rides/accept/${rideId}`);
    initializeDashboard();
  };

  const startRide = async (rideId) => {

    const otp = otpInputs[rideId];

    if (!otp) return alert("Enter OTP");

    await API.put(`/rides/start/${rideId}?otp=${otp}`);

    initializeDashboard();
  };

  const completeRide = async (rideId) => {

    await API.put(`/rides/complete/${rideId}`);

    initializeDashboard();
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleString() : "-";

  const getStatusBadge = (status) => {

    const styles = {
      ACCEPTED: "bg-blue-100 text-blue-700",
      IN_PROGRESS: "bg-purple-100 text-purple-700",
      PAYMENT_PENDING: "bg-yellow-100 text-yellow-700",
      PAID: "bg-green-100 text-green-700"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Driver Dashboard...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <h1 className="text-3xl font-bold mb-8">
          Welcome {user?.name} 🚖
        </h1>

        {/* DRIVER STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">Driver Rating</p>

            <p className="text-3xl font-bold text-yellow-500">
              ⭐ {averageRating}
            </p>

            <p className="text-gray-400 text-sm">
              {reviews.length} reviews
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">Total Rides</p>

            <p className="text-3xl font-bold">
              {myRides.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">Active Ride</p>

            <p className="text-3xl font-bold">
              {activeRide ? "1" : "0"}
            </p>

          </div>

        </div>

        {/* LIVE MAP */}

        {activeRide && (

          <div className="bg-white p-6 rounded-xl shadow mb-10">

            <h2 className="text-xl font-semibold mb-4">
              Live Ride Tracking
            </h2>

            <MapView
              pickupCoords={[
                activeRide.pickupLatitude,
                activeRide.pickupLongitude
              ]}
              dropCoords={[
                activeRide.dropLatitude,
                activeRide.dropLongitude
              ]}
            />

          </div>

        )}

        {/* AVAILABLE RIDES */}

        {!activeRide && (

          <>
            <h2 className="text-2xl font-semibold mb-6">
              Available Rides
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {availableRides.map((ride) => (

                <div
                  key={ride.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >

                  <p className="font-semibold text-lg">
                    {ride.pickupLocation} → {ride.dropLocation}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Fare: ₹{ride.fare}
                  </p>

                  <button
                    onClick={() => acceptRide(ride.id)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Accept Ride
                  </button>

                </div>

              ))}

            </div>

          </>
        )}

        {/* MY RIDES */}

        <h2 className="text-2xl font-semibold mt-12 mb-6">
          My Rides
        </h2>

        {myRides.map((ride) => (

          <div
            key={ride.id}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >

            <div className="flex justify-between mb-3">

              <p className="font-semibold">
                {ride.pickupLocation} → {ride.dropLocation}
              </p>

              {getStatusBadge(ride.status)}

            </div>

            <p className="text-gray-600">
              Fare: ₹{ride.fare}
            </p>

            <div className="text-sm text-gray-500 mt-3 space-y-1">

              <p>Booked: {formatDate(ride.bookedAt)}</p>
              <p>Started: {formatDate(ride.startedAt)}</p>
              <p>Completed: {formatDate(ride.completedAt)}</p>

            </div>

            {/* START RIDE */}

            {ride.status === "ACCEPTED" && (

              <div className="mt-4 flex gap-3">

                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border px-3 py-2 rounded w-40"
                  value={otpInputs[ride.id] || ""}
                  onChange={(e) =>
                    setOtpInputs({
                      ...otpInputs,
                      [ride.id]: e.target.value
                    })
                  }
                />

                <button
                  onClick={() => startRide(ride.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Start Ride
                </button>

              </div>

            )}

            {/* COMPLETE */}

            {ride.status === "IN_PROGRESS" && (

              <button
                onClick={() => completeRide(ride.id)}
                className="bg-black text-white px-5 py-2 rounded mt-4"
              >
                Complete Ride
              </button>

            )}

            {/* PAYMENT */}

            {ride.status === "PAYMENT_PENDING" && (

              <div className="mt-4 bg-yellow-50 p-3 rounded text-yellow-700">
                Waiting for rider payment...
              </div>

            )}

            {ride.status === "PAID" && (

              <div className="mt-4 bg-green-50 p-3 rounded text-green-700">
                Payment Received ✅
              </div>

            )}

          </div>

        ))}

        {/* REVIEWS */}

        <div className="bg-white p-6 rounded-xl shadow mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Rider Reviews
          </h2>

          {reviews.length === 0 ? (

            <p className="text-gray-500">
              No reviews yet
            </p>

          ) : (

            reviews.map((review) => (

              <div
                key={review.id}
                className="border-b py-3"
              >

                <p className="text-yellow-500 text-lg">
                  {"★".repeat(review.rating)}
                </p>

                <p>{review.comment}</p>

                <p className="text-sm text-gray-400">
                  {formatDate(review.createdAt)}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default DriverDashboard;