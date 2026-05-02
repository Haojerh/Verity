import { z } from "zod";

export const topicSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(20, "Title cannot exceed 20 characters"),

  description: z.string()
    .min(1, "Description is required"),

  avatar: z.any().refine(val => val !== null && val !== undefined, {
    message: "Avatar is required",
  }),

  banner: z.any().refine(val => val !== null && val !== undefined, {
    message: "Banner is required",
  }),
});

export const registerSchema = z
  .object({
    userName: z.string().min(1, "Name is required"),

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