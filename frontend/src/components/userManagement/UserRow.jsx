import { useState } from "react";
import { ChevronDown, History } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function UserRow({ user, onAction }) {
  const [open, setOpen] = useState(false);

  return (
    <tr className="border-t hover:bg-muted/30">
      <td className="p-4 text-xs">#{user.userID}</td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          <Avatar name={user.name} size="sm" imageUrl={user.avatar} />
          {user.name}
        </div>
      </td>

      <td className="hidden lg:table-cell p-4">{user.email}</td>

      <td className="hidden lg:table-cell p-4 text-center">
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.banned ? "bg-destructive/15 text-destructive" : "bg-muted"
        }`}>
          {user.banned ? "Yes" : "No"}
        </span>
      </td>

      <td className="hidden lg:table-cell p-4 text-center">
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.muted ? "bg-yellow-700/15 text-yellow-700" : "bg-muted"
        }`}>
          {user.muted ? "Yes" : "No"}
        </span>
      </td>

      <td className="hidden md:table-cell p-4 text-center">
        <button onClick={() => onAction("logs", user)} className="p-1 rounded">
            <History className="h-5 w-5 text-primary hover:text-secondary" />
        </button>
      </td>

      {/* ACTION DROPDOWN */}
      <td className="p-4 relative text-center">
        <button
          onClick={() => setOpen(!open)}
          className={`px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${
            open ? "bg-primary text-white" : "bg-muted hover:bg-muted/50"
            }`}>
          Manage
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-8 md:right-4 mt-2 w-32 bg-background border rounded-lg shadow-lg dark:shadow-dark-lg z-50">
            <button 
              onClick={() => onAction("warn", user)}
              className="w-full text-left px-3 py-2 text-xs rounded-t-md hover:bg-muted/50">
                Warn
            </button>
            
            {/* BAN / UNBAN */}
            <button
              onClick={() => onAction(user.banned ? "unban" : "ban", user)}
              className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50"
            >
              {user.banned ? "Unban" : "Ban"}
            </button>

            {/* MUTE / UNMUTE */}
            <button
              onClick={() => onAction(user.muted ? "unmute" : "mute", user)}
              className="w-full text-left px-3 py-2 text-xs rounded-b-md hover:bg-muted/50"
            >
              {user.muted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
      </td>
    </tr>  
  );
}