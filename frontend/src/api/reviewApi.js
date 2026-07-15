import api from "./axios";

export const getBusinessReviewsRequest = (businessId) => api.get(`/reviews/business/${businessId}`);
export const getReviewRequest = (id) => api.get(`/reviews/${id}`);
export const createReviewRequest = (data) => api.post("/reviews", data);
export const updateReviewRequest = (id, data) => api.patch(`/reviews/${id}`, data);
export const deleteReviewRequest = (id) => api.delete(`/reviews/${id}`);

export const createReplyRequest = (reviewId, data) => api.post(`/reviews/${reviewId}/reply`, data);
export const updateReplyRequest = (replyId, data) => api.patch(`/reviews/reply/${replyId}`, data);
export const deleteReplyRequest = (replyId) => api.delete(`/reviews/reply/${replyId}`);
