import { request } from "../services/request";

export const getUserNotifications = async(userID) => {
    return request("GET", `/api/notifications/${userID}`)
}

export const markAsRead = async(notiID) => {
    return request("POST", `/api/notification/${notiID}`)
}
