import { useState } from "react";
import Modal from "../ui/Modal";
import { CirclePlus } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import TextBox from "../ui/TextBox";
import ImageUpload from "../ui/ImageUpload";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { createTopic } from "../../services/TopicService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topicSchema } from "../../utils/Schema";
import { useToast } from "../../context/ToastContext";

export default function NewTopicModal({ onClose, setTopics }) {
  const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, isSubmitting }
    } = useForm({
      resolver: zodResolver(topicSchema),
      mode: "onChange",
      reValidateMode: "onChange"
  });

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await createTopic(data);
      console.log("Created:", data);
      onClose();
      setTopics((prev) => [
        ...prev,
        { topicID: data.topicID, name: data.name, description: data.description, avatar: URL.createObjectURL(data.avatar), banner: URL.createObjectURL(data.banner) }
      ]);
      showToast("Topic Added");
    } catch (err) {
      showToast("Error creating topic:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader text="New Topic" color="primary" icon={CirclePlus} onClose={onClose}/>
      
      <div className="px-8 pb-8 space-y-6 overflow-y-auto flex-1">
        <TextBox
          label="Enter Title"
          placeholder="Enter topic title..."
          error={errors.name?.message}
          {...register("name")}
        />

        <TextBox
          multiline
          label="Enter Description"
          placeholder="Enter description..."
          error={errors.description?.message}
          {...register("description")}
        />

        <ImageUpload
          label="Upload Avatar"
          value={watch("avatar")}
          onChange={(file) => setValue("avatar", file, { shouldValidate: true })}
          error={errors.avatar?.message}
          type="avatar"
        />

        <ImageUpload
          label="Upload Banner"
          value={watch("banner")}
          onChange={(file) => setValue("banner", file, { shouldValidate: true })}
          error={errors.banner?.message}
          type="banner"
        />
      </div>

      {/* Footer */}
      <ModalFooter 
        buttonText={isSubmitting ? "Creating..." : "Confirm Add"}
        buttonColor="primary"
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose} 
      />
    </Modal>
  );
}