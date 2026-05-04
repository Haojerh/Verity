import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../utils/Schema";
import { Save } from "lucide-react";
import TextBox from "../ui/TextBox";

export default function PersonalInfoForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    console.log("Update profile:", data);
    // call API here
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