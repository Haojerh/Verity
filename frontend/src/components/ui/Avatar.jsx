function getAvatarColor(name) {
  const colors = ["#ef4444", "#3b82f6", "#22c55e"];
  return colors[name.length % colors.length];
}

function getInitials(name) {
  return name.slice(0, 1).toUpperCase();
}

export default function Avatar({ name, size = "md", imageUrl }) {
  const getAvatarColor = (name) => {
    // Add null check here
    if (!name || typeof name !== 'string') {
      return 'bg-gray-500'; // Default color for null/undefined
    }
    
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    // Add null check here
    if (!name || typeof name !== 'string') {
      return '?';
    }
    return name.charAt(0).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={name || 'Avatar'} 
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold`}>
      {getInitials(name)}
    </div>
  );
}
