import Modal from "../ui/Modal";
import { X, History } from "lucide-react";
import ModalFooter from "../ui/ModalFooter";

export default function PunishmentLogs({ onClose, logs }) {
  return (
    <Modal onClose={onClose}>
      {/* HEADER */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
            <History className="w-8 h-8 text-primary bg-primary/10 p-1 rounded-md" />
            <h3 className="text-xl font-bold">Punishment Logs</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* BODY */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-muted/80">
            <tr>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Moderator</th>
              <th className="p-4 text-left">Reason</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t hover:bg-muted/30">
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
                <td className="p-4 font-semibold text-primary">{log.moderator}</td>
                <td className="p-4 text-xs text-gray-600">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <ModalFooter buttonText="Done" buttonColor="primary" buttonNumber={1} onClose={onClose} />
    </Modal>
  );
}