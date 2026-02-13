import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips, saveTrips } from "../utils/storage";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [cover, setCover] = useState(null);
  

  
  const createTrip = () => {
    if (!name) {
      alert("Enter trip name");
      return;
    }

    const existingTrips = getTrips();

    const newTrip = {
      id: Date.now().toString(),
      name: name,
      start: start,
      end: end,
      cover,
      memories: []
    };

    existingTrips.push(newTrip);

    saveTrips(existingTrips);

    console.log("Saved Trips:", existingTrips);

    navigate("/dashboard");
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
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <br /><br />

      <label>End Date</label><br />
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <br /><br />
    <br /><br />

<label>Cover Image</label><br />

<input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCover(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  }}
/>

      <button onClick={createTrip}>Create Trip</button>
    </div>
  );
}

