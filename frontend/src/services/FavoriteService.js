import { request } from './Request';

export const getFavorites = async () => {
    return await request('GET', '/api/favorites'); 
};

export const createFavorite = async (id) => {
    return await request('POST', `/api/favorites/${id}`); 
};

export const deleteFavorite = async (id) => {
    return await request('DELETE', `/api/favorites/${id}`); 
};
