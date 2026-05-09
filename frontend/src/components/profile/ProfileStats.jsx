export default function ProfileStats({ user, followers, reputation }) {
  return (
    <div className="flex gap-6 justify-center sm:justify-start">
      <div>
        <div className="font-semibold">
          {followers ? followers.toLocaleString() : 0}
        </div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>

      <div>
        <div className="font-semibold">
          {reputation ? reputation.toLocaleString() : 0}
        </div>
        <div className="text-sm text-muted-foreground">Reputation</div>
      </div>
    </div>
  );
}