import api from "./axios";

export const getSectorsRequest = () =>
  api.get("/sectors");