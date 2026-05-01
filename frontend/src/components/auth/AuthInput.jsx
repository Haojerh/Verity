import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthInput({ 
  label, 
  icon: Icon, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  error 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground ml-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        )}
        <input
          name={name}
          type={inputType}
          required
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? "pl-10" : "px-4"} pr-10 py-2.5 bg-background border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-foreground ${
            error 
            ? "border-destructive focus:ring-destructive/20" 
            : "border-border focus:ring-primary/20 focus:border-primary"
          }`}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive mt-1 ml-1">{error}</p>}
    </div>
  );
}