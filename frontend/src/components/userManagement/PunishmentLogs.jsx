import Modal from "../ui/Modal";
import { History } from "lucide-react";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function PunishmentLogs({ roleType="user", onClose, logs }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Punishment Logs" color="primary" icon={History} onClose={onClose}/>

      {/* BODY */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-muted/80">
            <tr>
              {roleType == "mod" && <th className="p-4 text-left">User</th>}
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Duration</th>
              {roleType == "user" && <th className="p-4 text-left">Moderator</th>}
              <th className="p-4 text-left">Reason</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t hover:bg-muted/30">
                {roleType == "mod" && <td className="p-4 font-semibold text-primary">{log.user}</td>}
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
                {roleType == "user" && <td className="p-4 font-semibold text-primary">{log.moderator}</td>}
                <td className="p-4 text-xs">{log.reason}</td>
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