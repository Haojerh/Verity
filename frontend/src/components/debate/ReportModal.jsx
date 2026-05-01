import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";

export default function ReportModal({ post, onClose, type="postReport" }) {
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
      <ModalHeader text={`Report ${type == "postReport" ? "Post" : "Comment"}`} color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={reason}
          onChange={setReason}
          placeholder="Choose a violation reason..."
        />
      </div>

      {/* Footer */}
      <ModalFooter buttonText="Confirm Report" buttonColor="red" onClose={onClose} />
    </Modal>
  );
}