import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { X, TriangleAlert } from "lucide-react";

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
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
            <TriangleAlert className="w-8 h-8 text-destructive bg-destructive/10 p-1 rounded-md" />
            <h3 className="text-xl font-bold">Warn {roleType == "default" ? "User" : "Moderator"}</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay user={user} type="warn" />
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