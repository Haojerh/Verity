import { ChevronDown } from "lucide-react";

export default function SelectBox({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
}) {
  return (
    <div className="space-y-2">
      
      {/* LABEL */}
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest ml-1">
          {label}
        </label>
      )}

      {/* SELECT */}
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-box border border-box-border text-muted-foreground rounded-xl py-3.5 px-4 pr-10 text-sm font-medium transition-all"
        >
          {/* Placeholder */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Options */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}