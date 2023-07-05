import { api } from "./apiService";

import { ParticipanteData } from "../interfaces/ParticipanteData";

export const createParticipante = async (
  participanteData: ParticipanteData
) => {
  const response = await api.post("/participante", participanteData);
  return response.data;
};

export const getAllParticipantes = async () => {
  const response = await api.get("/participante");
  return response.data;
};

export const getParticipante = async (participanteId: string) => {
  const response = await api.get(`/participante/${participanteId}`);
  return response.data;
};

export const updateParticipante = async (
  participanteId: string,
  updatedData: ParticipanteData
) => {
  const response = await api.patch(
    `/participante/${participanteId}`,
    updatedData
  );
  return response.data;
};

export const deleteParticipante = async (participanteId: string) => {
  const response = await api.delete(`/participante/${participanteId}`);
  return response.data;
};
