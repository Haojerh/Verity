import React from "react";

const TextBox = React.forwardRef(
  (
    { label, multiline = false, error, placeholder = "Enter the value...", ...props },
    ref
  ) => {
    const baseClasses =
      "w-full appearance-none bg-muted/70 border text-muted-foreground rounded-xl py-3.5 px-4 text-sm font-medium transition-all";

    const borderClasses =
      error ? "outline-destructive border-destructive focus:border-destructive" : "";

    return (
      <div className="flex flex-col">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-widest mb-2">
            {label}
          </label>
        )}

        {multiline ? (
          <textarea
            ref={ref}
            className={`${baseClasses} ${borderClasses} min-h-25 resize-none`}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            className={`${baseClasses} ${borderClasses}`}
            placeholder={placeholder}
            {...props}
          />
        )}

        {error && <span className="text-xs text-destructive mt-1">{error}</span>}
      </div>
    );
  }
);

export default TextBox;