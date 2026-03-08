import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import RideForm from "../components/RideForm";
import MapView from "../components/MapView";

function RiderDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadDashboard();

    const interval = setInterval(() => {
      fetchRides();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadDashboard = async () => {

    await fetchUser();
    await fetchRides();

    setLoading(false);
  };

  const fetchUser = async () => {

    try {

      const res = await API.get("/user/me");

      if (res.data.role !== "RIDER") {
        navigate("/driver-dashboard");
        return;
      }

      setUser(res.data);

    } catch {

      localStorage.removeItem("token");
      navigate("/login");

    }
  };

  const fetchRides = async () => {

    try {

      const res = await API.get("/rides/my-rides");

      const active = (res.data || []).filter(
        r => r.status !== "REVIEWED"
      );

      setRides(active);

    } catch {

      setRides([]);

    }
  };

  const cancelRide = async (rideId) => {

    await API.put(`/rides/cancel/${rideId}`);
    fetchRides();

  };

  const handleCashPayment = async (rideId) => {

    try {

      await API.put(`/rides/pay-cash/${rideId}`);

      alert("Cash Payment Successful 💵");

      setShowPaymentOptions(false);
      setSelectedPayment("");

      fetchRides();

    } catch {

      alert("Cash Payment Failed");

    }
  };

  const submitReview = async (rideId) => {

    if (!rating) return alert("Select rating");

    try {

      await API.post(`/reviews/submit/${rideId}`, null, {
        params: { rating, comment }
      });

      alert("⭐ Review Submitted");

      setRating(0);
      setComment("");

      setRides(prev => prev.filter(r => r.id !== rideId));

    } catch {

      alert("Review failed");

    }
  };

  const getStatusBadge = (status) => {

    const styles = {
      REQUESTED: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-green-100 text-green-800",
      PAID: "bg-emerald-100 text-emerald-800"
    };

    return (
      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const activeRide = rides.find(
    ride =>
      ride.status === "REQUESTED" ||
      ride.status === "ACCEPTED" ||
      ride.status === "IN_PROGRESS" ||
      ride.status === "COMPLETED" ||
      ride.status === "PAID"
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Rider Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <h1 className="text-3xl font-bold mb-8">
          Welcome {user?.name} 🚖
        </h1>

        {/* BOOK RIDE */}

        {!activeRide && (

          <div className="bg-white p-8 rounded-xl shadow mb-10">

            <h2 className="text-xl font-semibold mb-6">
              Book Your Ride
            </h2>

            <RideForm onRideBooked={fetchRides} />

          </div>

        )}

        {/* ACTIVE RIDE */}

        {activeRide && (

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-6">
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

            <div className="flex justify-between items-center mt-6">

              {getStatusBadge(activeRide.status)}

              {activeRide.status === "REQUESTED" && (
                <button
                  onClick={() => cancelRide(activeRide.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel Ride
                </button>
              )}

            </div>

            {/* OTP */}

            {activeRide.status === "ACCEPTED" && activeRide.otp && (

              <div className="mt-8 bg-blue-50 p-6 rounded-lg text-center">

                <p className="text-gray-600 mb-3">
                  Share this OTP with your driver
                </p>

                <p className="text-5xl font-bold text-blue-600 tracking-widest">
                  {activeRide.otp}
                </p>

              </div>

            )}

            {/* PAYMENT */}

            {activeRide.status === "COMPLETED" && (

              <div className="mt-6 bg-gray-100 p-4 rounded">

                <p className="font-semibold mb-3">
                  Ride completed. Choose payment method
                </p>

                {!showPaymentOptions && (
                  <button
                    onClick={() => setShowPaymentOptions(true)}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Pay Now
                  </button>
                )}

                {showPaymentOptions && (

                  <div className="mt-4 space-y-3">

                    <select
                      className="border p-2 rounded w-full"
                      value={selectedPayment}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    >
                      <option value="">Select Payment</option>
                      <option value="CASH">Cash</option>
                      <option value="CARD">Card</option>
                      <option value="UPI">UPI</option>
                    </select>

                    {selectedPayment === "CASH" && (

                      <button
                        onClick={() => handleCashPayment(activeRide.id)}
                        className="bg-black text-white px-4 py-2 rounded w-full"
                      >
                        Pay Cash
                      </button>

                    )}

                    {selectedPayment === "CARD" && (

                      <button
                        onClick={() => handleCashPayment(activeRide.id)}
                        className="bg-black text-white px-4 py-2 rounded w-full"
                      >
                        Pay with Card
                      </button>

                    )}

                    {selectedPayment === "UPI" && (

                      <button
                        onClick={() => handleCashPayment(activeRide.id)}
                        className="bg-black text-white px-4 py-2 rounded w-full"
                      >
                        Pay with UPI
                      </button>

                    )}

                  </div>

                )}

              </div>

            )}
            {/* REVIEW */}

            {activeRide.status === "PAID" && (

              <div className="mt-8 bg-white border p-6 rounded-lg">

                <h3 className="font-semibold mb-4">
                  Rate Your Driver
                </h3>

                <div className="flex gap-3 mb-4">

                  {[1,2,3,4,5].map((star) => (

                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl ${
                        rating >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>

                  ))}

                </div>

                <textarea
                  placeholder="Write your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border p-3 rounded w-full"
                />

                <button
                  onClick={() => submitReview(activeRide.id)}
                  className="bg-black text-white px-5 py-2 rounded mt-4"
                >
                  Submit Review
                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default RiderDashboard;