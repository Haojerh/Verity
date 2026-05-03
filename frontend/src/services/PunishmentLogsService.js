import { request } from './Request';

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

export const demoteModerator = async (userID) => {
    return await request('POST', `/api/moderators/demote/${userID}`);
};