import Modal from "../ui/Modal";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { Ban } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { deleteAccount } from "../../services/UserService";
import { logout } from "../../services/request";
import { useToast } from "../../context/ToastContext";

export default function DeleteModal({ user, onClose }) {
  const { showToast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteAccount();
      onClose();
      showToast("Account deleted successfully");
      await logout();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        text="Delete Account"
        color="red"
        icon={Ban}
        onClose={onClose}
      />

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="delete" />
      </div>

      <ModalFooter
        buttonText="Delete"
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleDelete}
      />
    </Modal>
  );
}