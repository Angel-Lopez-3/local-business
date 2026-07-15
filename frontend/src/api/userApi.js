import api from "./axios";

export const updateMyProfileRequest = (data) => api.patch("/users/profile", data);
export const changePasswordRequest = (data) => api.patch("/users/change-password", data);

// Admin
export const getUsersRequest = () => api.get("/users");
export const searchUsersRequest = (q) => api.get("/users/search", { params: { q } });
export const getUserRequest = (id) => api.get(`/users/${id}`);
export const updateUserByAdminRequest = (id, data) => api.patch(`/users/${id}`, data);
export const activateUserRequest = (id) => api.patch(`/users/${id}/activate`);
export const deactivateUserRequest = (id) => api.patch(`/users/${id}/deactivate`);
