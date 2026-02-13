import { getToken } from "../utils/auth";

export const fetchProfile = async () => {
  const res = await fetch("/api/users/me", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};
