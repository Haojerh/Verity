import { Link } from "react-router-dom";
import { User, Settings, LogOut, Contrast } from "lucide-react";

export default function ProfileDropdown({ onClose, onToggle }) {
  return (
    <div className="absolute right-0 top-10 mt-2 w-48 bg-card border rounded-lg shadow-lg dark-shadow-dark-lg overflow-hidden z-50">
      <Link
        to="/profile"
        onClick={onClose}
        className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm"
      >
        <User className="w-4 h-4"/>
        Profile
      </Link>

      <button 
      onClick={() => {
        onToggle();
        onClose();
      }}
      className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm font-normal"
      >
        <Contrast className="w-4 h-4" />
        Display
      </button>

      <Link
        to="/settings"
        onClick={onClose}
        className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm"
      >
        <Settings className="w-4 h-4"/>
        Settings
      </Link>

      <hr className="border-border" />

      <button
        onClick={onClose}
        className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm text-red-600"
      >
        <LogOut className="w-4 h-4"/>
        Logout
      </button>

    </div>
  );
}