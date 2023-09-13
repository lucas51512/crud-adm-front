import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import AuthService from "../services/authService";

export const register = (nomeUsuario: string, email: string, password: string) => (dispatch: any) => {
    return AuthService.register(nomeUsuario, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = 
            (error.response &&
             error.response.data &&
             error.response.data.message) ||
             error.message || error.toString();

             dispatch({
                type: REGISTER_FAIL,
             });

             dispatch({
                type: SET_MESSAGE,
                payload: message,
             });

             return Promise.reject();
        }
    );
};

export const login = (email: string, password: string) => (dispatch: any) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { usuario: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message = 
            (error.response &&
             error.response.data &&
             error.response.data.message) || 
             error.message ||
             error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch: any) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT
    });
}