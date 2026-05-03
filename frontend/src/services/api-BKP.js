// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.get["Content-Type"] = 'application/json';


// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// export const getAuthToken = () => {
//     return localStorage.getItem('auth_token');
// };

// export const setAuthHeader = (token) => {
//     const token = getCookie("Token");
//     localStorage.setItem('auth_token', token);   
// };

// export const setLogout =()=>{
//     window.localStorage.removeItem("auth_token");
//     window.localStorage.removeItem("user_id");
//     window.localStorage.removeItem("display_name");    
//     window.location.reload(false);             
// }

// export const request = (method, url, data) => {
//     let headers = {};
//     if (getAuthToken() !== null && getAuthToken() !== "null") {
//         headers = {'Authorization': Bearer ${getAuthToken()}};        
//     }
    
//     return axios({
//         method: method,
//         url: url,
//         headers: headers,
//         data: data});
// };

// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {    
    
//     if (400 === error.response.status) {
//         console.log(error.response.status);           
//     }else if(401 === error.response.status ){
//         if (window.localStorage.getItem('auth_token') != null){
//              alert (error.response.data.message);
//              setLogout();                                       
//         }            
//     } else {
//         console.log(error.response.status);           
//         return Promise.reject(error);
//     }        
// });