import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { Pencil } from "lucide-react";
import ConfirmDisplay from "../ui/ConfirmDisplay";
import TextBox from "../ui/TextBox";
import ImageUpload from "../ui/ImageUpload";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { topicSchema } from "../../utils/Schema";
import { createTopic, updateTopic } from "../../services/TopicService";
import { useToast } from "../../context/ToastContext";

export default function EditTopicModal({ topic, onClose, setTopics }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(topicSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: topic?.name || "",
      description: topic?.description || "",
      avatar: null,
      banner: null
    }
  });

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const res = await updateTopic(topic.topicID, data);
      const updated = res.topic;
      onClose();
      setTopics((prev) =>
        prev.map((t) =>
          t.topicID === topic.topicID
            ? {
                ...t,
                topicID: updated.topicID,
                name: updated.name,
                description: updated.description,
                avatar: `http://localhost:8080/api/uploads/topics/${updated.avatar}`,
                banner: `http://localhost:8080/api/uploads/topics/${updated.banner}`
              }
            : t
        )
      );
      showToast("Topic Updated");
    } catch (err) {
      showToast("Update failed:", err);
    }
  };
  
  return (
    <Modal onClose={onClose}>
      <ModalHeader text="Edit Topic" color="primary" icon={Pencil} onClose={onClose}/>

      <div className="px-8 pb-8 space-y-6 overflow-y-auto flex-1">
        <TextBox
          label="New Title"
          placeholder="Enter topic title..."
          error={errors.title?.message}
          {...register("name")}
        />

        <TextBox
          multiline
          label="New Description"
          placeholder="Enter description..."
          error={errors.description?.message}
          {...register("description")}
        />

        <ImageUpload 
          label="New Topic Avatar"
          value={watch("avatar")}
          onChange={(file) => setValue("avatar", file)}
          type="avatar"
          error={errors.avatar?.message}
        />

        <ImageUpload 
          label="New Topic Banner"
          value={watch("banner")}
          onChange={(file) => setValue("banner", file)}
          type="banner"
          error={errors.banner?.message}
        />
      </div>

      {/* Footer */}
      <ModalFooter
        buttonText={isSubmitting ? "Updating..." : "Confirm Edit"}
        buttonColor="primary"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Modal>
  );
}