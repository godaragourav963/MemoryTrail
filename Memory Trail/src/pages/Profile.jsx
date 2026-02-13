import { useEffect, useState } from "react";
import { fetchProfile } from "../api/user";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile().then(setUser);
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
