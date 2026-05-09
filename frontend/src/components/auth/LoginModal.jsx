import Modal from "../ui/Modal";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { demoteModerator } from "../../services/PunishmentLogsService";
import { formatDuration } from "../../utils/Utils";

export default function LoginModal({ user, remaining, onClose }) {
  const remainingTime = formatDuration(remaining);

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="User Banned" color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <div className="text-lg">Your account {user.name} has been banned. Please contact support for more information.</div>
        <div className="text-xl font-bold">Remaining Time: {remainingTime}</div>
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText="Close"
        buttonNumber={1}
        buttonColor="red"
        onClose={onClose}
      />
    </Modal>
  );
}