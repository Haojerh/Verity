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
import { WarnSchema } from "../../utils/Schema";
import { deletePost } from "../../services/PostService";

export default function ReportModal({ entity, onClose, type, onDelete}) {
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
        
        {/* The primary action for reporting */}
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting Report..." : "Submit Report"}
        </button>

        {onDelete && (
          <div className="pt-6 border-t border-border">
            <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-3">
              Danger Zone
            </h3>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl font-bold text-sm transition-all"
            >
              Delete Permanently
            </button>
          </div>
        )}
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