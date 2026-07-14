import api from "./axios";

export const getBusinessesRequest = () =>
  api.get("/businesses");

export const getMyBusinessRequest = () =>
  api.get("/businesses/my-business");

export const deleteBusinessRequest = (id) =>
  api.delete(`/businesses/${id}`);

export const createBusinessRequest = (data) =>
  api.post("/businesses", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });