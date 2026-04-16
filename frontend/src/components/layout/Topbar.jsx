import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoImage from "../../assets/Verity.svg";
import logoImageDark from "../../assets/VerityDark.svg"
import Avatar from "../ui/Avatar";
import ProfileDropdown from "../ui/ProfileDropdown";

export default function Topbar({ sidebarOpen, setSidebarOpen, onOpenDisplayMode, isDark }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const currentUser = "currentUser123";

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Left */}
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

        {/* Search */}
        <div className="hidden sm:block flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search debates..."
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(to right, #22c55e, #ef4444)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <button className="relative block sm:hidden">
            <Search />
          </button>

          <button className="p-2 relative">
            <Bell />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <Avatar name={currentUser} />
            </button>

            {profileMenuOpen && (
              <ProfileDropdown onClose={() => setProfileMenuOpen(false)} onToggle={onOpenDisplayMode} />
            )}
          </div>

        </div>
      </div>
    </header>
  );
}