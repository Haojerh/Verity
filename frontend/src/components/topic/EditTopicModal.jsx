import Modal from "../ui/Modal";
import { Pencil } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";

export default function EditTopicModal({ topic, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Edit Topic" color="primary" icon={Pencil} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        Testing
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Edit" buttonColor="primary" onClose={onClose} />
    </Modal>
  );
}