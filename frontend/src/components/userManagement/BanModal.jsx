import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import DurationSelector from "../ui/DurationSelector";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { X, Ban } from "lucide-react";

export default function BanModal({ user, onClose }) {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("30d");

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
            <Ban className="w-8 h-8 text-destructive bg-destructive/10 p-1 rounded-md" />
            <h3 className="text-xl font-bold">Ban User</h3>
        </div>
        <button onClick={onClose}>
            <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay user={user} type="ban" />
        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={reason}
          onChange={setReason}
          placeholder="Choose a violation reason..."
        />
        <DurationSelector
          value={duration}
          type="all"
          onChange={setDuration}
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Ban" buttonColor="red" onClose={onClose} />
    </Modal>
  );
}