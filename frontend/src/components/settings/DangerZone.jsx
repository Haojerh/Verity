import { Save } from "lucide-react";

export default function DangerZone({ setModal }) {
  return (
    <div className="bg-card border border-destructive/30 rounded-lg p-6">
      <h3 className="text-destructive mb-2">Danger Zone</h3>

      <p className="text-sm text-muted-foreground">
        Deleting your account cannot be undone.
      </p>
      <button
        onClick={() => setModal(true)}
        className="mt-8 sm:w-auto px-6 py-2 bg-destructive text-white hover:bg-destructive-hover rounded-md transition-colors"
      >
        Delete Account
      </button>
    </div>
  );
}
