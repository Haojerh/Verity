import Avatar from "./Avatar";

export default function ConfirmDisplay({ data, entity="user", type="punish" }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/70 border">
            <Avatar name={entity=="topic" ? data.title : data.name} size="md" imageUrl={data.avatar} />
            <div>
            <p className="font-bold">{entity=="topic" ? data.title : data.name}</p>
            <p className="text-sm">
                Are you sure you want to {type} this {entity=="topic" ? "topic" : "user"}?
            </p>
            </div>
        </div>
    )
}
