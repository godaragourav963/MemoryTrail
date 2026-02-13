export const getTrips = () => {
  return JSON.parse(localStorage.getItem("trips") || "[]");
};

export const saveTrips = (trips) => {
  localStorage.setItem("trips", JSON.stringify(trips));
};
