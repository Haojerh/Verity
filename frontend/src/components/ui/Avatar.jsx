function getAvatarColor(name) {
  const colors = ["#ef4444", "#3b82f6", "#22c55e"];
  return colors[name.length % colors.length];
}

function getInitials(name) {
  return name.slice(0, 1).toUpperCase();
}

export default function Avatar({ name, size = "md" }) {
  return (
    <div
      className="w-8 h-8 rounded-full text-white flex items-center justify-center"
      style={{ backgroundColor: getAvatarColor(name) }}
    >
      {getInitials(name)}
    </div>
  );
}