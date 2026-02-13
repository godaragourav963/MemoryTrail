import { useNavigate, Link } from "react-router-dom";
import { getTrips } from "../utils/storage";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  return (
    <div className="container">
      <h2>Your Trips</h2>

      {trips.length === 0 && <p>No trips yet</p>}

      {trips.map((trip, index) => (
        <div className="card" key={index}>

  {trip.cover && (
    <img
  src={trip.cover}
  style={{
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px"
  }}
/>

  )}

 <Link to={`/trip/${trip.id}`}>

    <strong>{trip.name}</strong>
  </Link>

  <p>{trip.start} → {trip.end}</p>

</div>

      ))}

      <button onClick={() => navigate("/create")}>
        + Add New Trip
      </button>
    </div>
  );
}



