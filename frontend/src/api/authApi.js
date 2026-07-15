import api from "./axios";

export const registerRequest = (data) => api.post("/auth/register", data);
export const loginRequest = (data) => api.post("/auth/login", data);
export const logoutRequest = () => api.post("/auth/logout");
export const logoutAllRequest = () => api.post("/auth/logout-all");
export const meRequest = () => api.get("/auth/me");
export const refreshTokenRequest = () => api.post("/auth/refresh-token");
export const forgotPasswordRequest = (data) => api.post("/auth/forgot-password", data);
export const resetPasswordRequest = (data) => api.post("/auth/reset-password", data);
