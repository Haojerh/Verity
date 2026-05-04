import UserRow from "./UserRow";

export default function UserTable({ users, onAction }) {
  return (
    <div className="bg-background border overflow-visible shadow-md dark:shadow-dark-md">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead className="bg-muted/80 text-xs uppercase">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="hidden lg:table-cell p-4 text-left">Email</th>
            <th className="hidden lg:table-cell p-4">Banned</th>
            <th className="hidden lg:table-cell p-4">Muted</th>
            <th className="hidden md:table-cell p-4">Logs</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow key={user.userID} user={user} onAction={onAction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}