import Modal from "../ui/Modal";
import ModalFooter from "../ui/ModalFooter";
import { Ban } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { useToast } from "../../context/ToastContext";
import { takedownComment, takedownPost } from "../../services/ReportService.js";

export default function TakedownModal({ entity, onClose, type, onSuccess }) {
  const { showToast } = useToast();

  const handleTakedown = async () => {
    try {
      if (type === "post") {
        await takedownPost(entity.postID);
      } else if (type === "comment") {
        await takedownComment(entity.id);
      }

      showToast("Takedown successfully");
      onSuccess?.();
      onClose();
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
        Are you sure to <span className="font-bold text-destructive">takedown</span> the {type}?
      </div>

      <ModalFooter
        buttonText="Takedown"
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleTakedown}
      />
    </Modal>
  );
}
