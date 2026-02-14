import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "12px 20px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <strong style={{ fontSize: 18 }}>MemoryTrail</strong>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {token && (
          <>
            <Link to="/dashboard" style={{ color: "white" }}>
              Dashboard
            </Link>

            <Link to="/create" style={{ color: "white" }}>
              Add Trip
            </Link>

            <Link to="/profile" style={{ color: "white" }}>
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#0077ff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

