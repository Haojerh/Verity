import { request } from './Request';

export const getUsers = async () => {
    return await request('GET', '/api/users'); 
};

export const getModerators = async () => {
    return await request('GET', '/api/moderators'); 
}
