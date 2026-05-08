import { useState, useEffect } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import { formatPostDateTime } from "../../utils/Utils";

export default function NotificationPanel({ onClose, onUnreadCountChange }) {
    const [notifications, setNotifications] = useState([
    {
        notificationID: "NTF-1",
        type: "VOTE",
        message: "John voted on your debate: 'AI will replace jobs'",
        isRead: false,
        SYSCREATEDDATE: "2026-05-08T10:15:00",
    },
    {
        notificationID: "NTF-2",
        type: "COMMENT",
        message: "Sarah commented on your post",
        isRead: false,
        SYSCREATEDDATE: "2026-05-08T09:30:00",
    },
    {
        notificationID: "NTF-3",
        type: "MILESTONE",
        message: "Your post reached 100 likes 🎉",
        isRead: true,
        SYSCREATEDDATE: "2026-05-08T07:00:00",
    },
    {
        notificationID: "NTF-4",
        type: "NEW_DEBATE",
        message: "New debate in your followed topic: Technology",
        isRead: false,
        SYSCREATEDDATE: "2026-05-07T22:45:00",
    },
    {
        notificationID: "NTF-5",
        type: "SYSTEM",
        message: "Your account settings were updated successfully",
        isRead: true,
        SYSCREATEDDATE: "2026-05-07T12:10:00",
    },
    {
        notificationID: "NTF-6",
        type: "COMMENT",
        message: "Alex replied to your comment",
        isRead: false,
        SYSCREATEDDATE: "2026-05-08T10:05:00",
    },
    ]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const getNotificationIcon = (type) => {
    switch(type) {
      case "VOTE": return "👍";
      case "COMMENT": return "💬";
      case "MILESTONE": return "🏆";
      case "NEW_DEBATE": return "📢";
      case "SYSTEM": return "🔔";
      default: return "📌";
    }
  };
  
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 border">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-secondary flex items-center gap-1"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-muted-foreground p-2">
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
            <p className="text-xs mt-1">When you get notifications, they'll appear here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.notificationID}
              className={`flex justify-between items-center gap-2 p-4 border-b cursor-pointer transition ${
                !notification.isRead ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-muted/40"
              }`}
              onClick={() => markAsRead(notification.notificationID, notification.isRead)}
            >
              <div className="flex gap-3">
                <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPostDateTime(notification.SYSCREATEDDATE)}
                  </p>
                </div>
              </div>
              {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
