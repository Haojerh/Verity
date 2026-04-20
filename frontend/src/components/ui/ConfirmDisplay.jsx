export default function ConfirmDisplay({ data, entity="user", type="punish" }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/70 border">
            <img src={data.avatar} className="w-12 h-12 rounded-lg" />
            <div>
            <p className="font-bold">{entity=="topic" ? data.title : data.name}</p>
            <p className="text-sm">
                Are you sure you want to {type} this {entity=="topic" ? "topic" : "user"}?
            </p>
            </div>
        </div>
    )
}
