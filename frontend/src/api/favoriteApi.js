import api from "./axios";

export const getFavoritesRequest = () => api.get("/favorites");
export const addFavoriteRequest = (businessId) => api.post(`/favorites/${businessId}`);
export const removeFavoriteRequest = (businessId) => api.delete(`/favorites/${businessId}`);
