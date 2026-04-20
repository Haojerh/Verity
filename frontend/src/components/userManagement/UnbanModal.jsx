import Modal from "../ui/Modal";
import { Ban } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function UnbanModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Unban User" color="primary" icon={Ban} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="unban" />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Unban" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}