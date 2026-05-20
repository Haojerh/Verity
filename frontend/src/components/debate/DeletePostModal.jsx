import Modal from "../ui/Modal";
import ModalFooter from "../ui/ModalFooter";
import { Ban } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { useToast } from "../../context/ToastContext";
import { takedownComment, takedownPost } from "../../services/ReportService.js";
import { deletePost } from "../../services/PostService";

export default function DelelePostModal({ entity, onClose, onSuccess }) {
  const { showToast } = useToast();

  const handleDelete = async () => {
    try {
      await deletePost(entity.postID)
      showToast("Delete successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        text="Delete Confirmation"
        color="red"
        icon={Ban}
        onClose={onClose}
      />

      <div className="px-8 py-10 text-center text-2xl">
        Are you sure to <span className="font-bold text-destructive">delete</span> the post?
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
