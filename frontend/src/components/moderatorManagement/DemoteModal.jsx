import Modal from "../ui/Modal";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";

export default function DemoteModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Demote Moderator" color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay user={user} type="demote" />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Demote" buttonColor="red" onClose={onClose} />
    </Modal>
  );
}