import { API_BASE } from "./base";
import { getToken } from "../utils/auth";

export const createTrip = async (tripData) => {
  const res = await fetch(`${API_BASE}/api/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(tripData)
  });

  return res.json();
};

export const fetchTrips = async () => {
  const res = await fetch(`${API_BASE}/api/trips`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};
