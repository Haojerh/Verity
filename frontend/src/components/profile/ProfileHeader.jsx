import ProfileStats from "./ProfileStats";
import Avatar from "../ui/Avatar";

export default function ProfileHeader({
  user,
  isOwnProfile = false,
  isFollowed = false,
  onFollowToggle,
  followers,
  reputation
}) {
  if (!user) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar
          name={user.name}
          size="xl"
          imageUrl={user.avatar}
        />

        <div className="flex-1">
            <h2 className="text-xl font-bold text-center sm:text-left">{user.name}</h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left mt-4">
                <ProfileStats user={user} followers={followers} reputation={reputation} />
                {!isOwnProfile && (
                <button
                    onClick={onFollowToggle}
                    className={`px-4 py-1.5 border-2 font-bold rounded-full text-sm active:scale-95 transition-all 
                    ${
                    isFollowed
                        ? "border-destructive text-destructive hover:bg-destructive/5"
                        : "border-primary text-primary hover:bg-primary/5"
                    }`}
                >
                    {isFollowed ? "- Unfollow" : "+ Follow"}
                </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}