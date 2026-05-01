import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        username: email, 
        password: password
      });
      
      console.log("Login successful:", response.data);
      window.location.href = '/'; 
    } catch (error) {
      console.log("Full Error Object:", error);
      const errorMessage = error.response?.data?.message || error.message || "Connection to server failed";
      alert(errorMessage);
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput 
          label="Email Address" 
          icon={Mail} 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="name@email.com" 
        />
        <AuthInput 
          label="Password" 
          icon={Lock} 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="••••••••" 
        />
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-secondary transition-opacity mt-4">
          Sign In
        </button>
      </form>
    </AuthCard>
  );
}