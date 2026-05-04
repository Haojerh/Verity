import { request } from './Request';
import { Http } from '../constant/http.method';

export const loginUser = async (email, password) => {
    const data = await request(Http.POST, "/login", {
        username: email,
        password: password
    });
    
    window.localStorage.setItem('display_name', data.name); 
    
    return data;
};

export const registerUser = async (userData) => {
    return await request(Http.POST, "/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        userRole: "basic"
    });
};