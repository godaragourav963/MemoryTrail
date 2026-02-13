import { useParams } from "react-router-dom";
import { getTrips, saveTrips } from "../utils/storage";
import { useState } from "react";

export default function TripView() {
  const { id } = useParams();

  const trips = getTrips();
  const trip = trips.find(t => t._id === id);

  if (!trip) {
    return <div className="container">Trip not found</div>;
  }

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      () => {
        alert("Unable to fetch location");
      }
    );
  };

  const editMemory = (index) => {
    const mem = trip.memories[index];

    setTitle(mem.title);
    setLocation(mem.location);
    setNotes(mem.notes);
    setLat(mem.lat || "");
    setLng(mem.lng || "");
    setPhoto(mem.photo || null);

    setEditingIndex(index);
  };

  const deleteMemory = (index) => {
    if (!window.confirm("Delete this memory?")) return;

    trip.memories.splice(index, 1);
    saveTrips(trips);
    window.location.reload();
  };

  const addMemory = () => {
    if (!title) {
      alert("Enter memory title");
      return;
    }

    if (editingIndex !== null) {
      trip.memories[editingIndex] = {
        ...trip.memories[editingIndex],
        title,
        location,
        lat,
        lng,
        notes,
        photo
      };

      setEditingIndex(null);
    } else {
      trip.memories.push({
        _id: Date.now().toString(),
        title,
        location,
        lat,
        lng,
        notes,
        photo,
        date: new Date().toLocaleString()
      });
    }

    saveTrips(trips);
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{trip.name}</h2>

      <h3>Add Memory</h3>

      <input
        placeholder="Memory Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Latitude (optional)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Longitude (optional)"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <br /><br />

      <button onClick={getLocation}>
        📍 Use Current Location
      </button>

      <br /><br />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <br /><br />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onloadend = () => {
            setPhoto(reader.result);
          };

          if (file) reader.readAsDataURL(file);
        }}
      />

      <br /><br />

      <button onClick={addMemory}>
        {editingIndex !== null ? "Update Memory" : "Add Memory"}
      </button>

      <h3>Timeline</h3>

      {trip.memories.map((m, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <strong>{m.title}</strong>
          <p>{m.location}</p>
          <p>{m.notes}</p>

          {m.photo && (
            <img
              src={m.photo}
              width="200"
              style={{ marginTop: 5 }}
            />
          )}

          <br />

          <button onClick={() => editMemory(index)}>
            Edit
          </button>

          <button
            onClick={() => deleteMemory(index)}
            style={{ marginLeft: 8, background: "red", color: "white" }}
          >
            Delete
          </button>

          <br />

          <small>{m.date}</small>
        </div>
      ))}

      <h3>Gallery</h3>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        {trip.memories
          .filter(m => m.photo)
          .map((m, index) => (
            <img
              key={index}
              src={m.photo}
              width="150"
              style={{ borderRadius: 5 }}
            />
        ))}
      </div>

      <h3>Route Map (Locations)</h3>

      <ul>
        {trip.memories
          .filter(m => m.location)
          .map((m, index) => (
            <li key={index}>
              📍 {m.location}
            </li>
        ))}
      </ul>

      <p>Total Memories: {trip.memories.length}</p>
    </div>
  );
}
