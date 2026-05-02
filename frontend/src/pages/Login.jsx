import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import { loginSchema } from "../utils/Schema";
import api from "../services/api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", {
        username: data.email,
        password: data.password,
      });

      console.log("Login successful:", response.data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Connection to server failed"
      );
    }
  };

  return (
    <AuthCard 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account"
      footerText="Don't have an account?"
      linkText="Create an account"
      linkTo="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-secondary transition-opacity mt-4">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}