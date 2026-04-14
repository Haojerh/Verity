import Modal from "../ui/Modal";
import { X, History } from "lucide-react";

export default function PunishmentLogs({ onClose, logs }) {
  return (
    <Modal onClose={onClose}>
      {/* HEADER */}
      <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <History className="text-primary" />
          Punishment Logs
        </h3>

        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* BODY */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Reason</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-semibold text-primary">{log.user}</td>
                <td className="p-4 text-xs">{log.time}</td>

                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    log.type === "Banned"
                      ? "bg-red-100 text-red-700"
                      : log.type === "Muted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {log.type}
                  </span>
                </td>

                <td className="p-4 text-xs">{log.duration}</td>
                <td className="p-4 text-xs text-gray-600">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t flex justify-end bg-gray-50">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-sm"
        >
          Done
        </button>
      </div>

    </Modal>
  );
}