import { api } from "./apiService";

function register(nomeUsuario: string, email: string, password: string){
    return api.post("/usuario", {
      nomeUsuario,
      email,
      password  
    })
}

function login(email: string, password:string){
    return api.post("/login", {
        email,
        password
    }).then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("usuario", JSON.stringify(response.data))
        }

        return response.data;
    });
}

function logout(){
    localStorage.removeItem("usuario");
}

export default {
    register,
    login,
    logout
}