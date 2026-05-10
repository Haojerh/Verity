import { useState, useEffect } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import { formatPostDateTime } from "../../utils/Utils";
import { getUserNotifications, markAsRead } from "../../services/NotiService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NotificationPanel({ notifications, setNotifications, onClose, unreadCount, onUnreadCountChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const markNotiRead = async (notiID, alreadyRead, sourceID) => {
    if (sourceID) navigate(`/post/${sourceID}`);
    if (alreadyRead) return;

    try {

      await markAsRead(notiID);

      setNotifications(prev =>
        prev.map(n =>
          n.notiID === notiID
            ? { ...n, read: true }
            : n
        )
      );

    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);

    try {

      await Promise.all(
        unreadNotifications.map(n =>
          markAsRead(n.notiID)
        )
      );

      setNotifications(prev =>
        prev.map(n => ({
          ...n,
          read: true
        }))
      );

    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "REPORT": return "🚨";
      case "POST": return "💬";
      case "PUNISHMENT": return "⚖️";
      default: return "📌";
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-background rounded-lg shadow-lg dark:shadow-dark-lg z-50 border">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">

        <h3 className="font-semibold text-lg">
          Notifications
        </h3>

        <div className="flex gap-2">

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-secondary flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}

          <button
            onClick={onClose}
            className="text-muted-foreground p-2"
          >
            <X size={20} />
          </button>

        </div>
      </div>

      {/* Notifications */}
      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-4 text-center text-muted-foreground">
            <Bell size={32} className="mx-auto mb-2 text-muted-foreground" />

            <p>No notifications yet</p>

            <p className="text-xs mt-1">
              When you get notifications, they'll appear here
            </p>
          </div>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification.notiID}
              className={`flex justify-between items-center gap-2 p-4 border-b cursor-pointer transition ${
                !notification.read
                  ? "bg-primary/10 hover:bg-primary/20"
                  : "hover:bg-muted/40"
              }`}
              onClick={() =>
                markNotiRead(notification.notiID, notification.read, notification.sourceID)
              }
            >

              <div className="flex gap-3">

                <div className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">

                  <p className="text-sm text-foreground">
                    {notification.message}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPostDateTime(notification.SYSCREATEDDATE)}
                  </p>

                </div>
              </div>

              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}

            </div>

          ))
        )}
      </div>
    </div>
  );
}