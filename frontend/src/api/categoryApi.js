import api from "./axios";

export const getCategoriesRequest = () => api.get("/categories");
export const getCategoryRequest = (id) => api.get(`/categories/${id}`);
export const createCategoryRequest = (data) => api.post("/categories", data);
export const updateCategoryRequest = (id, data) => api.patch(`/categories/${id}`, data);
export const activateCategoryRequest = (id) => api.patch(`/categories/${id}/activate`);
export const deactivateCategoryRequest = (id) => api.patch(`/categories/${id}/deactivate`);
