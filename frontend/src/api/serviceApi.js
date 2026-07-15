import api from "./axios";

export const getBusinessServicesRequest = (businessId) => api.get(`/services/${businessId}`);
export const createServiceRequest = (data) => api.post("/services", data);
export const updateServiceRequest = (id, data) => api.patch(`/services/${id}`, data);
export const deleteServiceRequest = (id) => api.delete(`/services/${id}`);
