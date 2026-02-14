import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api/base";
import { getToken } from "../utils/auth";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [cover, setCover] = useState(null);

  const handleCreateTrip = async () => {
    if (!name) {
      alert("Enter trip name");
      return;
    }

    const formData = new FormData();
    formData.append("tripName", name);
    formData.append("startDate", start);
    formData.append("endDate", end);

    if (cover) formData.append("coverImage", cover);

    const res = await fetch(`${API_BASE}/api/trips`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert("Trip created successfully!")
      navigate("/dashboard");
    } else {
      alert(data.message || "Failed to create trip");
    }
  };

  return (
    <div className="container">
      <h2>Create Trip</h2>

      <input
        placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <label>Start Date</label><br />
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <br /><br />

      <label>End Date</label><br />
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <br /><br />

      <label>Cover Image</label><br />
      <input type="file" onChange={(e) => setCover(e.target.files[0])} />
      <br /><br />

      <button onClick={handleCreateTrip}>Create Trip</button>
    </div>
  );
}
