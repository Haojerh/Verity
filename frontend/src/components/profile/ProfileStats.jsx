export default function ProfileStats({ user, followers }) {
  return (
    <div className="flex gap-6 justify-center sm:justify-start">
      <div>
        <div className="font-semibold">
          {followers.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>

      <div>
        <div className="font-semibold">
          {user.followers ? user.reputations.toLocaleString() : 0}
        </div>
        <div className="text-sm text-muted-foreground">Reputation</div>
      </div>
    </div>
  );
}