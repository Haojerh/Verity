import Avatar from "../ui/Avatar";

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  return date.toLocaleDateString();
}

export default function DebateHeader({ debate }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Avatar name={debate.poster} />

      <div>
        <p className="font-medium text-sm">{debate.poster}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(debate.date)}
        </p>
      </div>
    </div>
  );
}