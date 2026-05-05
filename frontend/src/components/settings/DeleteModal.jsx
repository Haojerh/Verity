import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import DurationSelector from "../ui/DurationSelector";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { Ban } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { reasonOptions } from "../../constant/Constants";
import { createPunishment } from "../../services/PunishmentLogsService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanMuteSchema } from "../../utils/Schema";

export default function DeleteModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Delete Account" color="red" icon={Ban} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="delete" />
      </div>

      {/* Footer */}
      <ModalFooter
        buttonText="Delete"
        buttonColor="red"
        onClose={onClose}
      />
    </Modal>
  );
}