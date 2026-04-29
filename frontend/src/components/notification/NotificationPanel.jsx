import { useState, useEffect } from "react";
import { Bell, CheckCheck, X } from "lucide-react";

export default function NotificationPanel({ onClose, onUnreadCountChange }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/notifications?page=0&size=20");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setNotifications(data.content || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/notifications/unread/count");
      const data = await response.json();
      const newCount = data.count;
      setUnreadCount(newCount);
      // Notify parent component (Topbar) to update the bell badge
      if (onUnreadCountChange) {
        onUnreadCountChange(newCount);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };
  
  const markAllAsRead = async () => {
    try {
      await fetch("http://localhost:8080/api/notifications/read-all", {
        method: "PUT",
      });
      // Update local state immediately
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => ({ ...notif, read: true }))
      );
      // Update unread count to 0 immediately
      setUnreadCount(0);
      if (onUnreadCountChange) onUnreadCountChange(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };
  
  const markAsRead = async (id, isCurrentlyRead) => {
    // Only mark as read if it's currently unread
    if (isCurrentlyRead) {
      console.log("Notification already read, skipping API call");
      return;
    }
    
    try {
      await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
        method: "PUT",
      });
      
      // Update local state immediately
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
      
      // Update unread count immediately (only decrease if it was unread)
      const newUnreadCount = unreadCount - 1;
      setUnreadCount(newUnreadCount);
      if (onUnreadCountChange) onUnreadCountChange(newUnreadCount);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };
  
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);
  
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
  
  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };
  
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Debug info */}
      {error && (
        <div className="p-2 bg-red-100 text-red-700 text-xs">
          Error: {error}
        </div>
      )}
      
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            Failed to load notifications
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
            <p className="text-xs mt-1">When you get notifications, they'll appear here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                !notification.read ? "bg-blue-50" : ""
              }`}
              onClick={() => markAsRead(notification.id, notification.read)}
            >
              <div className="flex gap-3">
                <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}