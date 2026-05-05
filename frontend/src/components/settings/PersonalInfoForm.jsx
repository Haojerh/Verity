import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../utils/Schema";
import { Save } from "lucide-react";
import TextBox from "../ui/TextBox";
import { updateProfile } from "../../services/userService";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function PersonalInfoForm({ user }) {
  const { showToast } = useToast();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      setUser((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
      }));
      showToast("Personal Info Updated Successfully");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="mb-8">Personal Information</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextBox
          label="Name"
          placeholder="Enter New Name..."
          {...register("name")}
          error={errors.name?.message}
        />

        <TextBox
          label="Email"
          placeholder="Enter New Email..."
          {...register("email")}
          error={errors.email?.message}
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