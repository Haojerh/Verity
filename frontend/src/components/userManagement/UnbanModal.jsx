import Modal from "../ui/Modal";
import { X, Ban } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";

export default function UnbanModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
            <Ban className="w-8 h-8 text-primary bg-primary/10 p-1 rounded-md" />
            <h3 className="text-xl font-bold">Unban User</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay user={user} type="unban" />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Unban" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}