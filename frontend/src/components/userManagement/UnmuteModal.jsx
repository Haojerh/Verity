import Modal from "../ui/Modal";
import { X, Volume2 } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";

export default function UnmuteModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
            <Volume2 className="w-8 h-8 text-primary bg-primary/10 p-1 rounded-md" />
            <h3 className="text-xl font-bold">Unmute User</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay user={user} type="unmute" />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Unmute" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}