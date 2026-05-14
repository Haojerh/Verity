import Modal from "../ui/Modal";
import SelectBox from "../ui/SelectBox";
import ModalFooter from "../ui/ModalFooter";
import ModalHeader from "../ui/ModalHeader";
import { TriangleAlert } from "lucide-react";
import { reasonOptions } from "../../constant/Constants";
import { createReport } from "../../services/ReportService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { warnSchema } from "../../utils/Schema";
import { deletePost } from "../../services/PostService";

export default function ReportModal({ entity, onClose, type, onDelete}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(warnSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      reason: ""
    }
  });

  const { user } = useAuth();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await createReport({
        reason: data.reason,
        type: type === "postReport" ? "POST" : "COMMENT",
        targetID: type === "postReport" ? entity.postID : entity.id,
        reporterID: user.userID
      });

      onClose();
      showToast("Report Issued")
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create report");
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete this ${type === "postReport" ? "post" : "comment"}?`)) {
      onDelete(type === "postReport" ? entity.postID : entity.id);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        text={`Report ${type === "postReport" ? "Post" : "Comment"}`}
        color="red"
        icon={TriangleAlert}
        onClose={onClose}
      />

      <div className="px-8 pb-4 space-y-6">
        <SelectBox
          label="Select Violation Reason"
          options={reasonOptions}
          value={watch("reason")}
          onChange={(val) => setValue("reason", val, { shouldValidate: true })}
          placeholder="Choose a reason..."
          error={errors.reason?.message}
        />
      </div>

      <ModalFooter
        buttonText={isSubmitting ? "Reporting..." : "Confirm Report"}
        buttonColor="red"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Modal>
  );
}