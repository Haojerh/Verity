import { useState } from "react";
import { ChevronDown, History } from "lucide-react";

export default function UserRow({ user, onOpenLogs }) {
  const [open, setOpen] = useState(false);

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-4">#{user.id}</td>

      <td className="p-4">
        <div className="flex items-center gap-2">
            <img src={user.avatar} className="w-8 h-8 rounded-full" />
            {user.name}
        </div>
      </td>

      <td className="hidden lg:table-cell p-4">{user.email}</td>

      <td className="hidden md:table-cell p-4 text-center">
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.isBanned ? "bg-red-200 text-red-700" : "bg-gray-200"
        }`}>
          {user.isBanned ? "Yes" : "No"}
        </span>
      </td>

      <td className="hidden md:table-cell p-4 text-center">
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.isMuted ? "bg-yellow-200 text-yellow-700" : "bg-gray-200"
        }`}>
          {user.isMuted ? "Yes" : "No"}
        </span>
      </td>

      <td className="hidden md:table-cell p-4 text-center">
        <button onClick={onOpenLogs} className="p-1 rounded">
            <History className="h-5 w-5 text-primary hover:text-secondary" />
        </button>
      </td>

      {/* ACTION DROPDOWN */}
      <td className="p-4 relative text-center">
        <button
          onClick={() => setOpen(!open)}
          className={`px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${
            open ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}>
          Manage
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-8 md:right-4 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">

            <button className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100">Warn</button>
            
            {/* BAN / UNBAN */}
            <button
              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
            >
              {user.isBanned ? "Unban" : "Ban"}
            </button>

            {/* MUTE / UNMUTE */}
            <button
              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
            >
              {user.isMuted ? "Unmute" : "Mute"}
            </button>

          </div>
        )}
      </td>
    </tr>  
  );
}