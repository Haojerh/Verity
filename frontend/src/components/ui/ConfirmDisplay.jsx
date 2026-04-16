export default function ConfirmDisplay({ user, type="punish"}) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/70 border borer-box">
            <img src={user.avatar} className="w-12 h-12 rounded-lg" />
            <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-sm">
                Are you sure you want to {type} this user?
            </p>
            </div>
        </div>
    )
}