export default function CommentInput({ userSide, value, onChange, onSubmit, submitting }) {
  if (!userSide) {
    return (
      <div className="p-8 bg-muted/30 rounded-2xl text-center border-2 border-dashed border-border mb-6">
        <p className="text-sm text-muted-foreground font-medium"> 
          Pick a side above to join the discussion 
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-4 rounded-2xl shadow-dark-sm mb-6">
      <textarea 
        className="w-full bg-input-background text-foreground p-4 rounded-xl border border-transparent focus:border-primary outline-none resize-none transition-all text-sm"
        placeholder={`Write your argument as a ${userSide === 'pros' ? 'supporter' : 'critic'}...`}
        rows="3"
        value={value || ""}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button
          type="button"
          disabled={!value?.trim() || submitting}
          onClick={onSubmit}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg not-only:hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}