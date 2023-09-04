import { api } from "./apiService";

import { LoginData } from "../interfaces/LoginData";
import { UsuarioData } from "../interfaces/UsuartioData";

export const registerUsuario = async (dadosUsuario: UsuarioData) => {
    const response = await api.post('/usuario', dadosUsuario);
    return response.data;
}

export const loginUsuario = async (dadosLogin: LoginData) => {
    const response = await api.post('/login', dadosLogin);
    return response.data;
}