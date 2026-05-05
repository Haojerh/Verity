import { request } from './Request';

export const getUsers = async () => {
    return await request('GET', '/api/users'); 
};

export const getCurrentUser = async () => {
    return await request('GET', '/api/user'); 
};

export const getModerators = async () => {
    return await request('GET', '/api/moderators'); 
}
