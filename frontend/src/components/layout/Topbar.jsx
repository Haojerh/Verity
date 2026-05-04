import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/Verity.svg";
import logoImageDark from "../../assets/VerityDark.svg";
import Avatar from "../ui/Avatar";
import ProfileDropdown from "../ui/ProfileDropdown";
import { useAuth } from "../../context/AuthContext";
import { getCurrentUser } from "../../services/userService";
// import NotificationPanel from "../notification/NotificationPanel";

export default function Topbar({ sidebarOpen, setSidebarOpen, onOpenDisplayMode,isDark }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setUser]);
  
  // // Fetch unread notification count
  // const fetchUnreadCount = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/notifications/unread/count");
  //     const data = await response.json();
  //     setUnreadCount(data.count);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };
  
  // // This function will be called from NotificationPanel when count changes
  // const handleUnreadCountChange = (newCount) => {
  //   setUnreadCount(newCount);
  // };
  
  // useEffect(() => {
  //   fetchUnreadCount();
  //   const interval = setInterval(fetchUnreadCount, 30000);
  //   return () => clearInterval(interval);
  // }, []);
  
  // const handleSearch = () => {
  //   if (!searchQuery.trim()) return;
    
  //   // Make sure to encode properly
  //   const encodedQuery = encodeURIComponent(searchQuery);
  //   console.log("Searching:", searchQuery);
  //   console.log("Encoded:", encodedQuery);
    
  //   navigate(`/?q=${encodedQuery}`);
  // };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block md:hidden p-2 hover:bg-muted rounded-lg"
          >
            ☰
          </button>
          <Link to="/">
            <img src={isDark ? logoImageDark : logoImage} className="h-10 hidden sm:block" />
          </Link>
        </div>

        {/* Search section */}
        <div className="hidden sm:block flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search debates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full pl-10 pr-4 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, #22c55e, #ef4444)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <button className="relative block sm:hidden">
            <Search />
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              className="p-2 relative hover:bg-muted rounded-lg"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Panel - Pass the callback */}
            {notificationOpen && (
              <NotificationPanel 
                onClose={() => setNotificationOpen(false)}
                onUnreadCountChange={handleUnreadCountChange}
              />
            )}
          </div>

          {/* Profile */}
          {/* <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <Avatar name={currentUser} />
            </button>
            {profileMenuOpen && (
              <ProfileDropdown onClose={() => setProfileMenuOpen(false)} />
            )}
          </div> */}

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <Avatar name={user?.name} />
            </button>
            {profileMenuOpen && (
              <ProfileDropdown 
                onClose={() => setProfileMenuOpen(false)} 
                onToggle={onOpenDisplayMode} // Pass the function here
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}