export default function PostInput({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-foreground">{label}</label>
      <input
        {...props}
        className={`bg-input-background p-3 border rounded-lg transition-all outline-none focus:ring-2 focus:ring-ring/50 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="text-xxs text-destructive mt-1">{error.message}</span>}
    </div>
  );
}