import { request } from "../services/request";

const getUserNotifications = async(userID) => {
    return request("GET", `/api/notifications/${userID}`)
}

const markAsRead = async(notiID) => {
    return request("POST", `/api/notification/${notiID}`)
}
