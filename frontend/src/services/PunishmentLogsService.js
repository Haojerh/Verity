import { request } from './request';

export const getLogs = async (userID) => {
    return await request('GET', `/api/users/logs/${userID}`);
};

export const createPunishment = async (punishmentData) => {
    return await request('POST', '/api/punishments', {
        userID: punishmentData.userID,
        type: punishmentData.type,
        reason: punishmentData.reason,
        duration: punishmentData.duration,
    });
};

export const unmuteUser = async (userID) => {
    return await request('DELETE', `/api/punishments/unmute/${userID}`);
};

export const unbanUser = async (userID) => {
    return await request('DELETE', `/api/punishments/unban/${userID}`);
};

export const demoteModerator = async (userID) => {
    return await request('POST', `/api/moderators/demote/${userID}`);
};