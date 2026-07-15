import api from "./axios";

export const getMyReportsRequest = () => api.get("/reports/my");
export const createReportRequest = (data) => api.post("/reports", data);
export const updateReportRequest = (id, data) => api.patch(`/reports/${id}`, data);

// Admin
export const getReportsRequest = (status) => api.get("/reports", { params: status ? { status } : {} });
export const updateReportStatusRequest = (id, status) => api.patch(`/reports/${id}/status`, { status });
