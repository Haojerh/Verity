import Modal from "../ui/Modal";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { demoteModerator } from "../../services/PunishmentLogsService";

export default function DemoteModal({ user, onClose, setModeratorData }) {

  const handleDelete = async () => {
    try {
      await demoteModerator(user.userID);
      setModeratorData((prev) => prev.filter((mod) => mod.userID !== user.userID));
      onClose();
    } catch (err) {
      console.error("Demotion failed:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Demote Moderator" color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="demote" />
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText="Confirm Demote"
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleDelete}
      />
    </Modal>
  );
}