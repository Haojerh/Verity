import { allOptions } from "../../constant/Constants";

export default function DurationSelector({ value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 mb-2">
        Select Duration
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allOptions.map((opt) => (
          <label key={opt.value} className="cursor-pointer group">
            <input
              type="radio"
              name="duration"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="hidden peer"
            />

            <div className={`
              px-4 py-3 rounded-xl border borer-box
              bg-muted/70 peer-checked:bg-destructive/30
              peer-checked:border-2 peer-checked:text-destructive
              peer-checked:border-destructive transition-all 
              group-hover:bg-destructive/5 group-hover:border-destructive/15
              flex flex-col items-center gap-1
              ${error ? 'border-destructive' : ''}
            `}>
              <span className="font-bold text-sm">{opt.title}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {opt.subtitle}
              </span>
            </div>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-destructive mt-1">{error}</span>}
    </div>
  );
}