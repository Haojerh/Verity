import Modal from "../ui/Modal";
import { Volume2 } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { unmuteUser } from "../../services/PunishmentLogsService";
import { useToast } from "../../context/ToastContext";

export default function UnmuteModal({ user, onClose, setUserData, isProfile=false }) {
  const { showToast } = useToast();

  const onSubmit = async () => {
    try {
      await unmuteUser(user.userID);

      if (isProfile) {
        setUserData((prev) => ({
          ...prev,
          muted: false,
        }));
      } else {
        setUserData((prev) =>
          prev.map((u) =>
            u.userID === user.userID
              ? { ...u, muted: false }
              : u
          )
        );
      }

      showToast("User Unmuted");
      onClose();
    } catch (err) {
      showToast("Error unmuting user:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Ummute User" color="primary" icon={Volume2} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="unmute" />
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText="Confirm Unmute" 
        buttonColor="primary" 
        onClose={onClose} 
        onSubmit={onSubmit}
      />
    </Modal>
  );
}