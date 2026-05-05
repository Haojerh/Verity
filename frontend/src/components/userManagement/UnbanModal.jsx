import Modal from "../ui/Modal";
import { Ban } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { unbanUser } from "../../services/PunishmentLogsService";
import { useToast } from "../../context/ToastContext";

export default function UnbanModal({ user, onClose, setUserData, isProfile=false }) {
  const { showToast } = useToast();

  const onSubmit = async () => {
    try {
      await unbanUser(user.userID);

      if (isProfile) {
        setUserData((prev) => ({
          ...prev,
          banned: false,
        }));
      } else {
        setUserData((prev) =>
          prev.map((u) =>
            u.userID === user.userID
              ? { ...u, banned: false }
              : u
          )
        );
      }

      showToast("User Unbanned");
      onClose();
    } catch (err) {
      showToast("Error unbanning user:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Unban User" color="primary" icon={Ban} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="unban" />
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText="Confirm Unban" 
        buttonColor="primary" 
        onClose={onClose}
        onSubmit={onSubmit} 
      />
    </Modal>
  );
}