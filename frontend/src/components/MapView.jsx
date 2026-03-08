import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ pickupCoords = null, dropCoords = null }) {
  const fallbackLocation = [15.477994, 78.483605]; // Nandyal fallback

  const [driverLocation, setDriverLocation] = useState(fallbackLocation);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  // 🚖 Live Driver Tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationLoaded(true);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setDriverLocation([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
        setLocationLoaded(true);
      },
      () => setLocationLoaded(true),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 🛣 Fetch Route from OSRM
  useEffect(() => {
    if (!pickupCoords || !dropCoords) return;

    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${pickupCoords[1]},${pickupCoords[0]};${dropCoords[1]},${dropCoords[0]}?overview=full&geometries=geojson`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];

          // Convert GeoJSON coords to Leaflet format
          const formattedCoords = route.geometry.coordinates.map(
            (coord) => [coord[1], coord[0]]
          );

          setRouteCoords(formattedCoords);

          // Distance in KM
          const km = (route.distance / 1000).toFixed(2);
          setDistance(km);
        }
      } catch (error) {
        console.error("Route fetch error:", error);
      }
    };

    fetchRoute();
  }, [pickupCoords, dropCoords]);

  if (!locationLoaded) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-xl">
        Getting live location...
      </div>
    );
  }

  return (
    <MapContainer
      center={driverLocation}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Driver Live Marker */}
      <Marker position={driverLocation}>
        <Popup>Driver Live Location 🚖</Popup>
      </Marker>

      {/* Pickup Marker */}
      {pickupCoords && (
        <Marker position={pickupCoords}>
          <Popup>Pickup Location 📍</Popup>
        </Marker>
      )}

      {/* Drop Marker */}
      {dropCoords && (
        <Marker position={dropCoords}>
          <Popup>
            Drop Location 🏁
            {distance && (
              <div className="mt-2 font-semibold">
                Distance: {distance} KM
              </div>
            )}
          </Popup>
        </Marker>
      )}

      {/* Route Polyline */}
      {routeCoords.length > 0 && (
        <Polyline positions={routeCoords} color="blue" />
      )}
    </MapContainer>
  );
}

export default MapView;