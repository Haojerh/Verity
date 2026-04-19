export default function ConfirmDisplay({ entity, entity="user", type="punish" }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/70 border borer-box">
            <img src={entity.avatar} className="w-12 h-12 rounded-lg" />
            <div>
            <p className="font-bold">{entity=="topic" ? entity.title : entity.name}</p>
            <p className="text-sm">
                Are you sure you want to {type} this {entity=="topic" ? "topic" : "entity"}?
            </p>
            </div>
        </div>
    )
}
