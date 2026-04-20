import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import DurationSelector from "../ui/DurationSelector";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { VolumeOff } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";

export default function MuteModal({ user, onClose }) {
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
      <ModalHeader text="Mute User" color="red" icon={VolumeOff} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        {/* User info */}
        <ConfirmDisplay data={user} type="mute" />

        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={reason}
          onChange={setReason}
          placeholder="Choose a violation reason..."
        />

        <DurationSelector
          value={duration}
          onChange={setDuration}
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Mute" buttonColor="red" onClose={onClose} />
    </Modal>
  );
}