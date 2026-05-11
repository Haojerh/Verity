import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "../components/auth/AuthCard";
import TextBox from "../components/ui/TextBox";
import { loginSchema } from "../utils/Schema";
import { loginUser } from "../services/auth"
import LoginModal from "../components/auth/LoginModal";
import PasswordBox from "../components/ui/PasswordBox";
import { useToast } from "../context/ToastContext";
import { getCurrentUser } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { showToast } = useToast();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    open: false,
    remaining: null,
    user: null
  });

  const onSubmit = async (values) => {
    try {
      const res = await loginUser(values.email, values.password);
      const data = res.User;

      if (res.banned) {
        openModal(true, res.remaining, data)
        return;
      }

      await refreshUser();

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      showToast("Failed to login");
    }
  };

  const openModal = useCallback((open, remaining, user) => {
    setModal({ open, remaining, user });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, remaining: null, user: null });
  }, []);

  return (
    <>
    <AuthCard 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account"
      footerText="Don't have an account?"
      linkText="Create an account"
      linkTo="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-secondary transition-opacity mt-4">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>

    {modal.open && 
      <LoginModal
        user={modal.user}
        remaining={modal.remaining}
        onClose={closeModal}
      />
    }
    </>
  );
}
