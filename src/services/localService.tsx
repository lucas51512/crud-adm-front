import { api } from "./apiService";

import { LocalData } from "../interfaces/LocalData";

export const createLocal = async (localData: LocalData) => {
  const response = await api.post("/local", localData);
  return response.data;
};

export const getAllLocais = async () => {
  const response = await api.get("/local");
  return response.data;
};

export const getLocal = async (localId: string) => {
  const response = await api.get(`/local/${localId}`);
  return response.data;
};

export const updateLocal = async (localId: string, updatedData: any) => {
  const response = await api.patch(`/local/${localId}`, updatedData);
  return response.data;
};

export const deleteLocal = async (localId: string) => {
  const response = await api.delete(`/local/${localId}`);
  return response.data;
};
