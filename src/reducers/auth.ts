import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/types";

const usuario = JSON.parse(localStorage.getItem('usuario') || '');

const initialState = usuario ? { isLoggedIn: true, usuario } : { isLoggedIn: false, usuario: null }

export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                usuario: payload.usuario,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                usuario: null,
            };
        case LOGOUT:
            return {
               ...state,
               isLoggedIn: false,
               usuario: null, 
            };
            default:
                return state;
    }
}