import { api } from "./apiService";

import { ReuniaoData } from "../interfaces/ReuniaoData";

export const createReuniao = async (reuniaoData: ReuniaoData) => {
  const response = await api.post("/reuniao", reuniaoData);
  return await response.data;
};

export const getAllReunioes = async () => {
  const response = await api.get("/reuniao");
  return await response.data;
};

export const getReuniao = async (reuniaoId: string) => {
  const response = await api.get(`/reuniao/${reuniaoId}`);
  return await response.data;
};

export const updateReuniao = async (
  reuniaoId: string,
  updatedData: ReuniaoData
) => {
  const response = await api.patch(`/reuniao/${reuniaoId}`, updatedData);
  return await response.data;
};

export const deleteReuniao = async (reuniaoId: string) => {
  const response = await api.delete(`/reuniao/${reuniaoId}`);
  return await response.data;
};
