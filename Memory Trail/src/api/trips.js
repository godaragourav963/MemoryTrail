import { getToken } from "../utils/auth";

export const fetchTrips = async () => {
  const res = await fetch("/api/trips", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};
