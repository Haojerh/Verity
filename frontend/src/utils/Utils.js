export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const formatPostDateTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateOnly = date.toLocaleDateString();

  if (diffDays === 0) {
    return `Today ${time}`;
  }

  if (diffDays === 1) {
    return `Yesterday ${time}`;
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  if (diffDays <= 30) {
    return `${dateOnly} ${time}`;
  }

  return dateOnly;
};

export const formatDuration = (minutes) => {
  if (minutes === -1) return "Permanent";

  const totalHours = Math.floor(minutes / 60);
  const days = Math.floor(totalHours / 24);
  const months = Math.floor(days / 30);

  const remainingDays = days % 30;
  const remainingHours = totalHours % 24;
  const remainingMinutes = minutes % 60;

  let result = [];

  if (months > 0) result.push(`${months} Month${months > 1 ? "s" : ""}`);
  if (remainingDays > 0) result.push(`${remainingDays} Day${remainingDays > 1 ? "s" : ""}`);
  if (remainingHours > 0) result.push(`${remainingHours} Hour${remainingHours > 1 ? "s" : ""}`);
  if (remainingMinutes > 0) result.push(`${remainingMinutes} Minute${remainingMinutes > 1 ? "s" : ""}`);

  return result.length ? result.join(" ") : "0 Minute";
};

export const isModerator = (currentUser) => { return currentUser?.userRole?.toUpperCase() === "MODERATOR" };
export const isAdmin = (currentUser) => { return currentUser?.userRole?.toUpperCase() === "ADMIN" };
