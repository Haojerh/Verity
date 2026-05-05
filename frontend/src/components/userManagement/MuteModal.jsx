import { useState } from "react";
import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import DurationSelector from "../ui/DurationSelector";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import ModalFooter from "../ui/ModalFooter";
import { VolumeOff } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { reasonOptions } from "../../constant/Constants";
import { createPunishment } from "../../services/PunishmentLogsService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanMuteSchema } from "../../utils/Schema";
import { useToast } from "../../context/ToastContext";

export default function MuteModal({ user, onClose, setUserData, isProfile=false }) {
  const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors, isSubmitting }
    } = useForm({
      resolver: zodResolver(BanMuteSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        reason: "",
        duration: 0
      }
  });

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await createPunishment({
        userID: user.userID,
        type: "MUTE",
        reason: data.reason,
        duration: data.duration
      });

      if (isProfile) {
        setUserData((prev) => ({
          ...prev,
          muted: true,
        }));
      } else {
        setUserData((prev) =>
          prev.map((u) =>
            u.userID === user.userID
              ? { ...u, muted: true }
              : u
          )
        );
      }

      showToast("User Muted");
      onClose();
    } catch (err) {
      showToast("Error creating punishment:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Mute User" color="red" icon={VolumeOff} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6">
        {/* User info */}
        <ConfirmDisplay data={user} type="mute" />

        <SelectBox
          label="Select Reason"
          options={reasonOptions}
          value={watch("reason")}
          onChange={(val) => setValue("reason", val, { shouldValidate: true })}
          placeholder="Choose a violation reason..."
          error={errors.reason?.message}
        />

        <DurationSelector
          value={watch("duration")}
          onChange={(val) => setValue("duration", val, { shouldValidate: true })}
          error={errors.duration?.message}
        />
      </div>

      {/* Footer */}
      <ModalFooter
        buttonText={isSubmitting ? "Muting..." : "Confirm Mute"}
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Modal>
  );
}