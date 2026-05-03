import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";
import { reasonOptions } from "../../constant/Constants";
import { createPunishment } from "../../services/PunishmentLogsService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WarnSchema } from "../../utils/Schema";

export default function WarnModal({ user, onClose, roleType="default" }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(WarnSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      reason: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await createPunishment({
        userID: user.userID,
        type: "WARN",
        reason: data.reason,
        duration: null
      });

      console.log("Punishment created:", data);
      onClose();
    } catch (err) {
      console.error("Error creating punishment:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text={`Warn ${roleType == "default" ? "User" : "Moderator"}`} color="red" icon={TriangleAlert} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        <ConfirmDisplay data={user} type="warn" />
        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={watch("reason")}
          onChange={(val) => setValue("reason", val, { shouldValidate: true })}
          placeholder="Choose a violation reason..."
          error={errors.reason?.message}
        />
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText={isSubmitting ? "Warning..." : "Confirm Warning"}
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Modal>
  );
}