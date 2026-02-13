import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      padding: "12px 20px",
      background: "#0077ff",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <strong>Memory Trail</strong>

      <div>
        <Link to="/dashboard" style={{ color: "white", marginRight: 15 }}>
          Dashboard
        </Link>

        <Link to="/create" style={{ color: "white" }}>
          Add Trip
        </Link>

        <Link to="/profile" style={{ color: "white", marginRight: 15 }}>
  Profile
</Link>

      </div>
    </nav>
  );
}
