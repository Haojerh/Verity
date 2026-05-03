import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json',
    }
});

export const request = (method, url, data) => {
    return client({
        method: method,
        url: url,
        data: data,
    });
};

export const logout = async () => {
    try {
        await request('POST', '/logout'); 
    } finally {
        localStorage.removeItem("user_id");
        localStorage.removeItem("display_name");
        window.location.href = '/login'; 
    }
};

client.interceptors.response.use(
    (response) => {
        return response.data.data ? response.data.data : response.data;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            logout();
        }

        return Promise.reject(error);
    }
);

// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.get["Content-Type"] = 'application/json';


// export const setAuthHeader = () => {
//     const token = getCookie("Token");
//     localStorage.setItem('auth_token', token.Value);   
// };

// export const setLogout =()=>{
//     window.localStorage.removeItem("auth_token");
//     window.localStorage.removeItem("user_id");
//     window.localStorage.removeItem("display_name");    
//     window.location.reload(false);             
// }

// export const request = (method, url, data) => {
//     return axios({
//         method: method,
//         url: url,
//         data: data,
//         withCredentials: true
//     });
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

