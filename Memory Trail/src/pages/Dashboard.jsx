import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTrips } from "../api/trips";

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    fetchTrips().then((data) => {
      setTrips(data.trips || []);
    });
  }, []);

  if (!trips) return <p style={{ padding: 20 }}>Loading trips...</p>;

  return (
    <div className="container">
      <h2>Your Trips</h2>

      {trips.length === 0 && <p>No trips yet</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {trips.map((trip) => (
          <div className="card" key={trip._id}>
            {trip.coverImage && (
              <img
                src={`http://localhost:5000/${trip.coverImage}`}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />
            )}

            <Link to={`/trip/${trip._id}`}>
              <strong style={{ fontSize: 16 }}>{trip.tripName}</strong>
            </Link>

            <p style={{ color: "#64748b", marginTop: 4 }}>
              {trip.startDate?.slice(0, 10)} → {trip.endDate?.slice(0, 10)}
            </p>
          </div>
        ))}
      </div>

      <button style={{ marginTop: 25 }} onClick={() => navigate("/create")}>
        + Add New Trip
      </button>
    </div>
  );
}
