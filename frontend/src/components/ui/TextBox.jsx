export default function TextBox({ label="Enter", multiline, error, placeholder="Enter the value...", value, onChange }) {
    const baseClasses = "w-full appearance-none bg-muted/70 border text-muted-foreground rounded-xl py-3.5 px-4 pr-10 text-sm font-medium transition-all";
    const borderClasses = error && "border-destructive";

    return (
        <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest ml-1">
                {label}
            </label>

            {multiline ? (
                <textarea 
                className={`${baseClasses} ${borderClasses} min-h-25 resize-none`}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)} 
                placeholder={placeholder}
                />
            ) : (
                <input 
                className={`${baseClasses} ${borderClasses}`}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)} 
                placeholder={placeholder}
                />
            )}

            {error && <span className="text-xs text-destructive">{error}</span>}
        </div>
    );
};