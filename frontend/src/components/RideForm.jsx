import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import API from "../api/axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RideForm({ onRideBooked }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  const fallback = [15.477994, 78.483605];

  // Convert town name → coordinates
  const geocodeLocation = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    const data = await res.json();
    if (data.length === 0) throw new Error("Location not found");
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  // Get route from OSRM
  const fetchRoute = async (start, end) => {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
    );
    const data = await res.json();

    return data.routes[0].geometry.coordinates.map((coord) => [
      coord[1],
      coord[0],
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickup || !drop) {
      alert("Enter pickup and drop locations");
      return;
    }

    setLoading(true);

    try {
      const start = await geocodeLocation(pickup);
      const end = await geocodeLocation(drop);

      setPickupCoords(start);
      setDropCoords(end);

      const routeCoords = await fetchRoute(start, end);
      setRoute(routeCoords);

      await API.post("/rides/book", {
        pickupLocation: pickup,
        dropLocation: drop,
        pickupLatitude: start[0],
        pickupLongitude: start[1],
        dropLatitude: end[0],
        dropLongitude: end[1],
      });

      if (onRideBooked) onRideBooked();

    } catch (err) {
      alert("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">


      <input
        type="text"
        placeholder="Enter Pickup Town"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Enter Drop Town"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <MapContainer
        center={pickupCoords || fallback}
        zoom={10}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickupCoords && <Marker position={pickupCoords} />}
        {dropCoords && <Marker position={dropCoords} />}

        {route.length > 0 && (
          <Polyline positions={route} pathOptions={{ color: "blue", weight: 5 }} />
        )}
      </MapContainer>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-black text-white p-2 rounded"
      >
        {loading ? "Processing..." : "Book Ride"}
      </button>
    </div>
  );
}

export default RideForm;