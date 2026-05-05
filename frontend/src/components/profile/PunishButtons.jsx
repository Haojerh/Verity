import { Ban, VolumeX, AlertTriangle } from "lucide-react";

export default function PunishButtons({
  user,
  openModal,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">

      {/* BAN / UNBAN */}
      {user.banned ? (
        <button
          onClick={() => openModal("unban", user)}
          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
        >
          <Ban className="w-4 h-4" />
          Unban
        </button>
      ) : (
        <button
          onClick={() => openModal("ban", user)}
          className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/10 transition-colors"
        >
          <Ban className="w-4 h-4" />
          Ban
        </button>
      )}

      {/* MUTE / UNMUTE */}
      {user.muted ? (
        <button
          onClick={() => openModal("unmute", user)}
          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
        >
          <VolumeX className="w-4 h-4" />
          Unmute
        </button>
      ) : (
        <button
          onClick={() => openModal("mute", user)}
          className="flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600/10 transition-colors"
        >
          <VolumeX className="w-4 h-4" />
          Mute
        </button>
      )}

      {/* WARN */}
      <button
        onClick={() => openModal("warn", user)}
        className="flex items-center gap-2 px-4 py-2 border border-yellow-600 text-yellow-600 rounded-md hover:bg-yellow-600/10 transition-colors"
      >
        <AlertTriangle className="w-4 h-4" />
        Warn
      </button>
    </div>
  );
}