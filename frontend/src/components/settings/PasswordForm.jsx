import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../utils/Schema";
import PasswordBox from "../ui/PasswordBox";
import { Save } from "lucide-react";
import { changePassword } from "../../services/userService";
import { useToast } from "../../context/ToastContext";

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.password,
      });

      showToast("Password Changed");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="mb-8">Change Password</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordBox
          label="Current Password"
          placeholder="••••••••"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        <PasswordBox
          label="New Password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <PasswordBox
          label="Confirm Password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 flex gap-2 items-center px-6 py-2 bg-primary text-white hover:bg-secondary rounded-md"
        >
          <Save />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
