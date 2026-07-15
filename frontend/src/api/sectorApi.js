import api from "./axios";

export const getSectorsRequest = () => api.get("/sectors");
export const getSectorRequest = (id) => api.get(`/sectors/${id}`);
export const createSectorRequest = (data) => api.post("/sectors", data);
