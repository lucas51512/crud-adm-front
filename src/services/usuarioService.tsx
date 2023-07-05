import { api } from "./apiService";

import { UsuarioData } from "../interfaces/UsuartioData";

export const createUsuario = async (usuarioData: UsuarioData) => {
  const response = await api.post("/usuario", usuarioData);
  return response.data;
};

export const getAllUsuarios = async () => {
  const response = await api.get("/usuario");
  return response.data;
};

export const getUsuario = async (usuarioId: string) => {
  const response = await api.get(`/usuario/${usuarioId}`);
  return response.data;
};

export const updateUsuario = async (usuarioId: string, updatedData: any) => {
  const response = await api.patch(`/usuario/${usuarioId}`, updatedData);
  return response.data;
};

export const deleteUsuario = async (usuarioId: string) => {
  const response = await api.delete(`/usuario/${usuarioId}`);
  return response.data;
};
