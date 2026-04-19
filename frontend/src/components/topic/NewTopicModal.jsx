import Modal from "../ui/Modal";
import { CirclePlus } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function NewTopicModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="New Topic" color="primary" icon={CirclePlus} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        Testing
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Add" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}