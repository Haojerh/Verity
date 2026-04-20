import Modal from "../ui/Modal";
import { Volume2 } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function UnmuteModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Ummute User" color="primary" icon={Volume2} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="unmute" />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Unmute" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}