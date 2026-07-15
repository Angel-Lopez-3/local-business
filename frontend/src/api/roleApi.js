import api from "./axios";

export const getRolesRequest = () => api.get("/roles");
export const getRoleRequest = (id) => api.get(`/roles/${id}`);
