import { request } from "../services/request";
import { Http } from "../constant/http.method";

const BASE_URL = "/api/stances";

export const getPostStats = (postID) => {
    return request(Http.GET, `${BASE_URL}/stats/${postID}`);
};

export const selectStance = (postID, userID, stance) => {
    return request(Http.POST, `${BASE_URL}/select-stance/${postID}`, {
        userID: userID,
        chosenStance: stance.toUpperCase(), 
    });
};

export const getUserStance = (postID, userID) => {
    return request(Http.GET, `${BASE_URL}/user-selection/${postID}/${userID}`);
};

