import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import api from "../services/api"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/Schema";

export default function Register() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(registerSchema),
      mode: "onChange",
    });

    const onSubmit = async (data) => {
      try {
        await api.post("/register", {
          userName: data.userName,
          email: data.email,
          password: data.password,
          userRole: "basic",
          userStatus: "ACTIVE",
        });

        alert("Account created successfully!");
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Registration failed");
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
        <AuthInput 
          label="Full Name" 
          icon={User} 
          type="text" 
          placeholder="John Doe" 
          {...register("userName")}
          error={errors.userName?.message}
        />
        <AuthInput 
          label="Email Address" 
          icon={Mail} 
          type="email" 
          placeholder="name@email.com" 
          {...register("email")}
          error={errors.email?.message}
        />
        <AuthInput 
          label="Password" 
          icon={Lock} 
          type="password" 
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />
        <AuthInput 
          label="Confirm Password" 
          icon={Lock} 
          type="password" 
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