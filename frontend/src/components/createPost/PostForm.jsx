import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import PostInput from "./PostInput";
import ImageUpload from "../ui/ImageUpload";
import { postSchema } from "../../utils/Schema";
import { customSelectStyles } from "../../components/ui/CustomSelectStyles";

export default function CreatePostPage({ onSubmit, topics }) {
  const { 
    register, 
    handleSubmit, 
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
        <p className="text-muted-foreground">Start a new discussion in the Verity community.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-xl border border-border shadow-dark-md">
        <PostInput 
          label="Title" 
          {...register("title")} 
          error={errors.title}
          placeholder="Enter post title..."
        />

        <div className="flex flex-col gap-2">
          <label className="text-foreground font-medium">Topic</label>
          <Controller
            name="topicID"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={topicOptions}
                placeholder="Search or select a topic..."
                value={topicOptions.find(opt => opt.value === field.value)}
                onChange={(option) => field.onChange(option?.value)}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                isClearable
              />
            )}
          />
          {errors.topicID && <span className="text-xxs text-destructive mt-1">{errors.topicID.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground font-medium">Description</label>
          <textarea 
            {...register("description")} 
            rows="6"
            placeholder="What is this discussion about?"
            className="bg-input-background p-3 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring/50 outline-none resize-none"
          />
          {errors.description && <span className="text-xxs text-destructive mt-1">{errors.description.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground font-medium">Post Image (Optional)</label>
          <ImageUpload
            value={watch("image")}
            onChange={(file) => setValue("image", file, { shouldValidate: true })}
            error={errors.image?.message}
            type="banner" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PostInput label="Pro Label" {...register("proLabel")} error={errors.proLabel} />
          <PostInput label="Con Label" {...register("conLabel")} error={errors.conLabel} />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg hover:bg-secondary transition-all disabled:opacity-50 font-bold tracking-wide shadow-lg"
          >
            {isSubmitting ? "POSTING..." : "CREATE POST"}
          </button>
        </div>
      </form>
    </div>
  );
}