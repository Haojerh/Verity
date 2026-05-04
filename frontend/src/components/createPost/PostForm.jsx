import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select";
import PostInput from "./PostInput";
import { postSchema } from "../../utils/Schema";
import { customSelectStyles } from "../../components/ui/CustomSelectStyles";
import TextBox from "../ui/TextBox";

export default function PostForm({ onSubmit, topics }) {
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      proLabel: "Pro",
      conLabel: "Con"
    }
  });

  const topicOptions = topics.map(t => ({
    value: t.topicID,
    label: t.name
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-xl border border-border shadow-dark-md">
      <TextBox
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

      <TextBox
        {...register("description")} 
        multiline
        label="Description"
        placeholder="What is this discussion about?"
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextBox label="Pro Label" {...register("proLabel")} error={errors.proLabel} />
        <TextBox label="Con Label" {...register("conLabel")} error={errors.conLabel} />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 font-bold tracking-wide"
      >
        {isSubmitting ? "POSTING..." : "CREATE POST"}
      </button>
    </form>
  );
}