import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";
import TextBox from "../components/ui/TextBox";
import api from "../services/Api"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/Schema";
import { registerUser } from "../services/Auth";
import PasswordBox from "../components/ui/PasswordBox";

export default function Register() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(registerSchema),
      mode: "onChange",
    });

    // const onSubmit = async (data) => {
    //   try {
    //     await api.post("/register", {
    //       userName: data.userName,
    //       email: data.email,
    //       password: data.password,
    //       userRole: "basic",
    //       userStatus: "ACTIVE",
    //     });

    //     alert("Account created successfully!");
    //     window.location.href = "/login";
    //   } catch (error) {
    //     console.error(error);
    //     alert(error.response?.data?.message || "Registration failed");
    //   }
    // };

    const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthCard 
      title="Create Account" 
      subtitle="Join Verity and start managing your notes"
      footerText="Already have an account?"
      linkText="Sign in instead"
      linkTo="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextBox 
          label="Full Name" 
          type="text" 
          placeholder="John Doe" 
          {...register("name")}
          error={errors.name?.message}
        />
        <TextBox 
          label="Email Address" 
          type="email" 
          placeholder="name@email.com" 
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordBox
          label="Password" 
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
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-4 hover:bg-secondary transition-opacity">
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}