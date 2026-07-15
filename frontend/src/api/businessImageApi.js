import api from "./axios";

export const getBusinessImagesRequest = (businessId) => api.get(`/business-images/all/${businessId}`);
export const createBusinessImageRequest = (data) =>
  api.post("/business-images", data);
export const deleteBusinessImageRequest = (id) => api.delete(`/business-images/${id}`);
