import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE } from "../api/base";
import { getToken } from "../utils/auth";

export default function TripView() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setTrip(data.trip);
      });
  }, [id]);

  if (!trip) return <p style={{ padding: 20 }}>Loading trip...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{trip.tripName}</h2>

      {trip.coverImage && (
        <img
          src={`http://localhost:5000/${trip.coverImage}`}
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "8px",
            marginBottom: "15px"
          }}
        />
      )}

      <p>
        <strong>Dates:</strong>{" "}
        {trip.startDate?.slice(0, 10)} → {trip.endDate?.slice(0, 10)}
      </p>

      <p>Memories feature coming next…</p>
    </div>
  );
}
