import { Search, Bell, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/Verity.svg";
import logoImageDark from "../../assets/VerityDark.svg";
import Avatar from "../ui/Avatar";
import ProfileDropdown from "../ui/ProfileDropdown";
import { useAuth } from "../../context/AuthContext";
import { getCurrentUser } from "../../services/UserService";
import NotificationPanel from "../notification/NotificationPanel";
import { getUserNotifications } from "../../services/NotiService";
import useSearchHistory from "../../hooks/useSearchHistory";
import { useDebounce } from "../../hooks/useDebounce";
import SearchDropdown from "../ui/SearchDropdown";
import { getSearchSuggestions } from "../../services/PostService";

export default function Topbar({ sidebarOpen, setSidebarOpen, onOpenDisplayMode,isDark }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Noti State
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 100);
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.userID) return;
    fetchNotifications();
  }, [user?.userID]);

  const fetchNotifications = async () => {
    const res = await getUserNotifications(user.userID);
    setNotifications(res.notifications || []);
  };

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    getSearchSuggestions(debouncedQuery).then(setSuggestions);
  }, [debouncedQuery]);

  const handleSearch = (q) => {
    const query = q || searchQuery;
    if (!query.trim()) return;
    addToHistory(query.trim());
    setSearchQuery(query);
    setDropdownVisible(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
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
              onFocus={() => setDropdownVisible(true)}
              onBlur={() => setDropdownVisible(false)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              className="w-full pl-10 pr-4 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, #22c55e, #ef4444)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            />

            <SearchDropdown
              query={searchQuery}
              suggestions={suggestions}
              history={history}
              onSelect={handleSearch}
              onRemoveHistory={removeFromHistory}
              onClearHistory={clearHistory}
              visible={dropdownVisible}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="relative block sm:hidden"
          >
            {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              className="p-2 relative hover:bg-muted rounded-lg"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xxs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Panel - Pass the callback */}
            {notificationOpen && (
              <NotificationPanel
                notifications={notifications}
                setNotifications={setNotifications}
                onClose={() => setNotificationOpen(false)}
                unreadCount={unreadCount}
                onUnreadCountChange={setUnreadCount}
              />
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <Avatar name={user?.name} imageUrl={user?.avatar ? `http://localhost:8080/api/uploads/users/${user?.avatar}` : null} />
            </button>
            {profileMenuOpen && (
              <ProfileDropdown 
                onClose={() => setProfileMenuOpen(false)} 
                onToggle={onOpenDisplayMode}
              />
            )}
          </div>
        </div>
      </div>
    </header>

    {mobileSearchOpen && (
      <div className="sm:hidden px-4 py-3 border-b border-border bg-card">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Search debates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setDropdownVisible(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMobileSearchOpen(false);
                handleSearch();
              }
            }}
            className="w-full pl-10 pr-10 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, #22c55e, #ef4444)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
          />
          <SearchDropdown
            query={searchQuery}
            suggestions={suggestions}
            history={history}
            onSelect={(q) => {
              setMobileSearchOpen(false);
              handleSearch(q);
            }}
            onRemoveHistory={removeFromHistory}
            onClearHistory={clearHistory}
            visible={dropdownVisible}
          />
        </div>
      </div>
    )}
    </>
  );
}