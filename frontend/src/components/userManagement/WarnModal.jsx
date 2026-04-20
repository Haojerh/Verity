import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";

export default function WarnModal({ user, onClose, roleType="default" }) {
  const [reason, setReason] = useState("");

  const reasonOptions = [
    { value: "spam", label: "Spamming / Self-Promotion" },
    { value: "harassment", label: "Harassment / Toxicity" },
    { value: "misinfo", label: "Spreading Misinformation" },
    { value: "tos", label: "Violation of Terms of Service" },
    { value: "other", label: "Other" },
  ];

  return (
    <Modal onClose={onClose}>
      <ModalHeader text={`Warn ${roleType == "default" ? "User" : "Moderator"}`} color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="warn" />
        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={reason}
          onChange={setReason}
          placeholder="Choose a violation reason..."
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Warn" buttonColor="red" onClose={onClose} />
    </Modal>
  );
}