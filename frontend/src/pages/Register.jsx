import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import api from "../services/api"; 
import { validatePassword } from "../components/utils/validation";

export default function Register() {
  const [userName, setUserName] = useState(""); // Matches Backend DTO casing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Sending payload to your Spring Boot /register endpoint
      const response = await api.post('/register', {
        userName: userName, 
        email: email,
        password: password,
        userRole: "basic",
        userStatus: "ACTIVE"
      });
      
      console.log("Registration successful:", response.data);
      alert("Account created successfully! Please sign in.");
      window.location.href = '/login'; 
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Registration failed. Ensure your backend is running.";
      alert(errorMessage);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput 
          label="Full Name" 
          icon={User} 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          placeholder="John Doe" 
          required 
        />
        <AuthInput 
          label="Email Address" 
          icon={Mail} 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="name@email.com" 
          required 
        />
        <AuthInput 
          label="Password" 
          icon={Lock} 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="••••••••"
          error={passwordError} 
          required 
        />
        <AuthInput 
          label="Confirm Password" 
          icon={Lock} 
          type="password" 
          value={confirmPassword} 
          onChange={handleConfirmPasswordChange} 
          placeholder="••••••••"
          error={confirmPasswordError} 
          required 
        />
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold mt-4 hover:bg-secondary transition-opacity">
          Sign Up
        </button>
      </form>
    </AuthCard>
  );
}