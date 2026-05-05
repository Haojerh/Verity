import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordBox = React.forwardRef(
  ({ label, error, placeholder = "Enter password...", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseClasses =
      "w-full appearance-none bg-muted/70 border text-foreground rounded-xl py-3.5 px-4 text-sm font-medium transition-all pr-10";

    const borderClasses = error
      ? "border-destructive focus:border-destructive"
      : "border-border focus:border-primary";

    return (
      <div className="flex flex-col">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-widest mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`${baseClasses} ${borderClasses}`}
            placeholder={placeholder}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {error && (
          <span className="text-xs text-destructive mt-1">{error}</span>
        )}
      </div>
    );
  }
);

PasswordBox.displayName = "PasswordBox";

export default PasswordBox;