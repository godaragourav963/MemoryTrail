import { API_BASE } from "./base";
import { getToken } from "../utils/auth";

export const fetchProfile = async () => {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};
