import Modal from "../ui/Modal";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { Ban } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { deleteAccount } from "../../services/UserService";
import { logout } from "../../services/request";
import { useToast } from "../../context/ToastContext";

export default function TakedownModal({ data, onClose }) {
  const { showToast } = useToast();

  const handleTakedown = async () => {
    try {
      onClose();
      showToast("Takedown successfully");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Takedown failed");
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        text="Takedown Confirmation"
        color="red"
        icon={Ban}
        onClose={onClose}
      />

      <div className="px-8 py-10 text-center text-2xl">
        Are you sure to <span className="font-bold">takedown</span> the post/comment?
      </div>

      <ModalFooter
        buttonText="Takedown"
        buttonColor="red"
        onClose={onClose}
      />
    </Modal>
  );
}