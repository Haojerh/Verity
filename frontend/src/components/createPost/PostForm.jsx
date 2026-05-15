import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextBox from "../ui/TextBox";
import SelectBox from "../ui/SelectBox";
import ImageUpload from "../ui/ImageUpload";
import { postSchema } from "../../utils/Schema";
import Header from "../ui/Header";

export default function CreatePostForm({ onSubmit, topics }) {
  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      topicID: "",
      description: "",
      proLabel: "Pro",
      conLabel: "Con",
      image: null 
    }
  });

  const topicOptions = topics.map(t => ({
    value: t.topicID,
    label: t.name
  }));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Header
        title="Create New Debate"
        desc="Start a new discussion in the Verity community."
      />

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 bg-card p-8 rounded-xl border border-border shadow-md dark:shadow-dark-md"
      >
        <TextBox 
          label="Debate Title" 
          {...register("title")} 
          error={errors.title?.message}
          placeholder="Enter post title..."
        />

        <div className="flex flex-col gap-2">
          <SelectBox
            label="Topic"
            options={topicOptions}
            placeholder="Select a topic..."
            value={watch("topicID")}
            onChange={(value) => setValue("topicID", value, { shouldValidate: true })}
            error={errors.topicID?.message}
          />
        </div>

        <TextBox 
          label="Description" 
          multiline={true}
          {...register("description")} 
          placeholder="What is this discussion about?"
          error={errors.description?.message}
        />

        <div className="flex flex-col gap-2">
          <label className="text-foreground font-medium">Header Image (Optional)</label>
          <ImageUpload
            value={watch("image")}
            onChange={(file) => setValue("image", file, { shouldValidate: true })}
            error={errors.image?.message}
            type="banner" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextBox label="Pro Side Label" {...register("proLabel")} error={errors.proLabel?.message} />
          <TextBox label="Con Side Label" {...register("conLabel")} error={errors.conLabel?.message} />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 font-bold tracking-wide shadow-lg"
          >
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}