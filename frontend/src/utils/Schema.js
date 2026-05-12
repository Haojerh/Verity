import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const topicSchema = z.object({
  name: z.string()
    .min(1, "Title is required")
    .max(20, "Title cannot exceed 20 characters"),

  description: z.string()
    .min(1, "Description is required"),

  avatar: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: "Avatar is required",
    })
    .refine((file) => file instanceof File, {
      message: "Avatar must be a file",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Avatar cannot exceed 10MB",
    }),

  banner: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: "Banner is required",
    })
    .refine((file) => file instanceof File, {
      message: "Banner must be a file",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Banner cannot exceed 10MB",
    }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "At least 8 characters required")
      .regex(/[A-Z]/, "Must contain 1 uppercase letter")
      .regex(/[0-9]/, "Must contain 1 number")
      .regex(/[!@#$%^&*]/, "Must contain 1 special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),

  password: z
    .string()
    .min(8, "At least 8 characters required")
    .regex(/[A-Z]/, "Must contain 1 uppercase letter")
    .regex(/[0-9]/, "Must contain 1 number")
    .regex(/[!@#$%^&*]/, "Must contain 1 special character"),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  topicID: z.string().min(1, "Please select a topic"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  proLabel: z.string().default("Pro"),
  conLabel: z.string().default("Con"),
  image: z
    .any()
    .optional()
    .refine((file) => {
      if (file == null) return true;
      return file instanceof File || typeof file === "string";
    }, {
      message: "Image must be a file or a valid URL",
    })
    .refine((file) => {
      if (!(file instanceof File)) return true;
      return file.size <= MAX_FILE_SIZE;
    }, {
      message: "Image cannot exceed 10MB",
    }),
});

export const WarnSchema = z.object({
  reason: z.string().min(1, "Reason is required")
});

export const BanMuteSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  duration: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .refine((val) => val > 0 || val === -1, {
      message: "Invalid duration",
    }),
});