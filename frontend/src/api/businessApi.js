import api from "./axios";

// Publico
export const getBusinessesRequest = () => api.get("/businesses");
export const getBusinessByIdRequest = (id) => api.get(`/businesses/${id}`);
export const getBusinessBySlugRequest = (slug) => api.get(`/businesses/slug/${slug}`);

// Dueño de negocio
export const getMyBusinessRequest = () => api.get("/businesses/my-business");
export const createBusinessRequest = (data) => api.post("/businesses", data);
export const updateBusinessRequest = (id, data) => api.patch(`/businesses/${id}`, data);
export const deleteBusinessRequest = (id) => api.delete(`/businesses/${id}`);
export const activateBusinessRequest = (id) => api.patch(`/businesses/${id}/activate`);
export const deactivateBusinessRequest = (id) => api.patch(`/businesses/${id}/deactivate`);

// Admin
export const getAllBusinessesAdminRequest = () => api.get("/businesses/admin/all");
export const verifyBusinessRequest = (id) => api.patch(`/businesses/${id}/verify`);
export const unverifyBusinessRequest = (id) => api.patch(`/businesses/${id}/unverify`);
