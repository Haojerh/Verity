import ModeratorRow from "./ModeratorRow";

export default function ModeratorTable({ users, onAction }) {
  return (
    <div className="bg-white rounded-xl border overflow-visible shadow-md">
      <table className="w-full text-sm">
        <thead className="bg-muted/80 text-xs uppercase">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="hidden lg:table-cell p-4 text-left">Email</th>
            <th className="hidden sm:table-cell p-4">Logs</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <ModeratorRow key={user.id} user={user} onAction={onAction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}