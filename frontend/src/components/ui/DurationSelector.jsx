export default function DurationSelector({ value, type="default", onChange }) {
  const allOptions = [
    { value: "24h", title: "24 Hours", subtitle: "Temporary" },
    { value: "7d", title: "7 Days", subtitle: "Warning" },
    { value: "30d", title: "30 Days", subtitle: "Severe" },
    { value: "perm", title: "Permanent", subtitle: "Final" },
  ];

  const options = type === "all" ? allOptions : allOptions.filter((opt) => opt.value !== "perm");

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
        Select Duration
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer group">
            <input
              type="radio"
              name="duration"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="hidden peer"
            />

            <div className="
              px-4 py-3 rounded-xl border border-box-border
              bg-box peer-checked:bg-destructive/30
              peer-checked:border-2 peer-checked:text-destructive
              peer-checked:border-destructive transition-all 
              group-hover:bg-destructive/5 group-hover:border-destructive/15
              flex flex-col items-center gap-1
            ">
              <span className="font-bold text-sm">{opt.title}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {opt.subtitle}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}