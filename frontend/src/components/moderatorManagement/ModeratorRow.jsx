import { History } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function ModeratorRow({ user, onAction }) {
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

      <td className="hidden sm:table-cell p-4 text-center">
        <button onClick={() => onAction("logs", user)} className="p-1 rounded">
            <History className="h-5 w-5 text-primary hover:text-secondary" />
        </button>
      </td>

      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <button 
              onClick={() => onAction("warn", user)}
              className="px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 bg-muted hover:bg-gray-300">
                Warn
            </button>
            <button
              onClick={() => onAction("demote", user)}
              className="px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 text-white bg-destructive hover:bg-destructive-hover">
                Demote
            </button>
        </div>
       </td>
    </tr>
    
  );
}